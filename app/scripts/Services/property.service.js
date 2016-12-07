angular.module('services')
	.factory('propertyService', ['$q', '$filter', 'propertyApiRepo', 'propertyDBRepo', 'imageDBRepo', 'sketchDBRepo',
		function($q, $filter, propertyApiRepo, propertyDBRepo, imageDBRepo, sketchDBRepo) {
			var factory = {};

			var findNewPropertyIds = function() {
				return propertyApiRepo.getIds().then(getIdsNotInDB);
			};

			var getIdsNotInDB = function(ids){
				var promises = [];
				var newList = [];

				for(var i = 0; i < ids.length; i++){
					promises.push(addIdIfNotExists(ids[i], newList));
				}

				return $q.all(promises).then(function(){
					return newList;
				});
			};

			var addIdIfNotExists = function(id, idList){
				return propertyDBRepo.exists(id)
					.then(
						function(exists) {
							if(!exists) {
								idList.push(id);
							}
						}
					);
			};

			var fetchPropertiesFromServer = function(propertyIds) {
				var promises = [];
				for (var i = 0; i < propertyIds.length; i++) {
					promises.push(fetchPropertyFromServer(propertyIds[i]));
				}

				return $q.all(promises);
			};

			var fetchPropertyFromServer = function(propertyId) {
				var deferred = $q.defer();

				propertyApiRepo.getProperty(propertyId).then(
					function(property){
						property.Completed = "false";
						property.Notes = [];
						property.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: 'Unable to gain access to property due to locked gate'})
						property.WorkStatus = 'unscheduled';
						property.Coords = [property.Location.Longitude, property.Location.Latitude];

						for (var i =0; i < property.Buildings.length; i++){
							property.Buildings[i].Modified = false;
							property.Buildings[i].ModifiedDate = null;
							property.Buildings[i].Notes = [];


							if(property.Buildings[i].BuildingProperty.Note.length > 0){
								property.Buildings[i].Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: property.Buildings[i].BuildingProperty.Note});
							}
						}

						propertyDBRepo.add(property);
						deferred.resolve(true);
					}
				);

				return deferred.promise;
			};

			var pushPropertyToServer = function(propertyId){
			 	return factory.get(propertyId).then(propertyApiRepo.update);
			};

			var pushPropertiesToServer = function(propertyIds){
				promises = [];

				for(var i = 0; i < propertyIds.length; i++){
					promises.push(pushPropertyToServer(propertyIds[i]));
				}

				return $q.all(promises);
			};

			var getBuilding = function(property, buildingId){
				var deferred = $q.defer();
				var building;

				for(var i = 0; i < property.Buildings.length; i++){
					if(property.Buildings[i].Id == buildingId){
						deferred.resolve(property.Buildings[i]);
						break;
					}
				}

				if(!building){
					deferred.reject();
				}

				return deferred.promise;
			}

			factory.getAll = function(){
				return propertyDBRepo.getAll();
			};

			factory.get = function(id) {
				return propertyDBRepo.get(id);
			};

			factory.update = function(property) {
				return propertyDBRepo.update(property);
			};

			factory.updateAll = function(properties) {
				var promises = [];
				for(var i = 0; i < properties.length; i++){
					promises.push(factory.update(properties[i]));
				}

				return $q.all(promises);
			};

			factory.sendCompletedPropertiesToServer = function() {
				return propertyDBRepo.getCompleted().then(pushPropertiesToServer);
			};

			factory.fetchNewPropertiesFromServer = function() {
				return findNewPropertyIds().then(fetchPropertiesFromServer);
			};

			//Building Functions
			factory.getBuilding = function(propertyId, buildingId) {
				return propertyDBRepo.get(propertyId).then(
					function(property){
						return getBuilding(property, buildingId);
					}
				);
			};

			var filterWorkStatus = function(workStatus){
				var deferred = $q.defer();
				factory.getAll().then(function(properties){
					 var filtered = $filter('filter')(properties, { WorkStatus: workStatus }, true);
					 deferred.resolve(filtered);
				});

				return deferred.promise;
			}

			factory.getScheduledProperties = function() {
				return filterWorkStatus("scheduled");
			};

			factory.getUnscheduledProperties = function() {
				return filterWorkStatus("unscheduled");
			};

			factory.getCompleteProperties = function() {
				return filterWorkStatus("complete");
			};

			factory.scheduleProperty = function(property) {
				property.WorkStatus = "scheduled";
				return factory.update(property);
			};

			factory.unScheduleProperty = function(property) {
				property.WorkStatus = "unscheduled";
				return factory.update(property);
			};

			factory.completeProperty = function(property) {
				property.WorkStatus = "complete";
				return factory.update(property);
			};

			var getBuildingIndex = function(buildingId, property){
				var deferred = $q.defer();
				for(var i = 0; i < property.Buildings.length; i++){
					if(property.Buildings[i].Id == buildingId){
						deferred.resolve(i);
						break; 
					}
				}
				return deferred.promise;
			};

			factory.getNextBuilding = function(property, buildingId){
				var deferred = $q.defer();

				getBuildingIndex(buildingId, property).then(function(index) {
					var nextIndex = index + 1;
					if(nextIndex == property.Buildings.length){
						nextIndex = 0;
					}

					deferred.resolve(property.Buildings[nextIndex]);
				});

				return deferred.promise;
			};

			factory.getPreviousBuilding = function(property, buildingId){
				var deferred = $q.defer();

				getBuildingIndex(buildingId, property).then(function(index) {
					var previousIndex = index - 1;
					if(previousIndex < 0){
						previousIndex = property.Buildings.length - 1;
					}

					deferred.resolve(property.Buildings[previousIndex]);
				});

				return deferred.promise;
			};

			factory.updateBuilding = function(propertyId, building) {
				var deferred = $q.defer();
				factory.get(propertyId)
				.then(
					function(property){
						getBuildingIndex(building.Id, property)
						.then(function(index){
							property.Buildings[index] = building;
							factory.update(property).then(function(){
								deferred.resolve();
							});
						});
				});

				return deferred.promise;
			};

			return factory;
}]);	
