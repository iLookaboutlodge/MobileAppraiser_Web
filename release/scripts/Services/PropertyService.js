angular.module('property', ['propertyApi', 'propertyIndexDB', 'imageIndexDB', 'sketchIndexDB'])
	.factory('propertyService', ['$q', 'propertyApiService', 'propertyIndexDBService', 'imageIndexDBService', 'sketchIndexDBService',
		function($q, propertyApiService, propertyIndexDBService, imageIndexDBService, sketchIndexDBService) {
			var factory = {};

			var findNewPropertyIds = function() {
				return propertyApiService.getIds().then(getIdsNotInDB);
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
				return propertyIndexDBService.exists(id)
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

				propertyApiService.getProperty(propertyId).then(
					function(property){
						property.Completed = "false";
						property.Notes = [];
						property.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: 'Unable to gain access to property due to locked gate'})
						
						for (var i =0; i < property.Buildings.length; i++){
							property.Buildings[i].Modified = false;
							property.Buildings[i].ModifiedDate = null;
							property.Buildings[i].Notes = [];

							if(property.Buildings[i].BuildingProperty.Note.length > 0){
								property.Buildings[i].Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: property.Buildings[i].BuildingProperty.Note});
							}
						}

						propertyIndexDBService.add(property);
						deferred.resolve(true);
					}
				);

				return deferred.promise;
			};

			var pushPropertyToServer = function(propertyId){
			 	return factory.get(propertyId).then(propertyApiService.update);
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
				return propertyIndexDBService.getAll();
			};

			factory.get = function(id) {
				return propertyIndexDBService.get(id);
			};

			factory.update = function(property){
				return propertyIndexDBService.update(property);
			};

			factory.sendCompletedPropertiesToServer = function() {
				return propertyIndexDBService.getCompleted().then(pushPropertiesToServer);
			};

			factory.fetchNewPropertiesFromServer = function() {
				return findNewPropertyIds().then(fetchPropertiesFromServer);
			};

			//Building Functions
			factory.getBuilding = function(propertyId, buildingId) {
				return propertyIndexDBService.get(propertyId).then(
					function(property){
						return getBuilding(property, buildingId);
					}
				);
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

			//IMAGES
			var fetchfrontImage = function(id) {
				return propertyApiService.getImage('/images/Properties/' + id + '.png')
					.then(
						function(imageData) {
							return imageIndexDBService.add(id, id, imageData, 'image/png');
						}
					);
			};

			var fetchFrontImages = function(properties) {
				var promises = [];
				
				for(var i = 0; i < properties.length; i++) {
					promises.push(fetchfrontImage(properties[i].Id));
				}

				return $q.all(promises);
			}

			var encode = function (input) {
			    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			    var output = "";
			    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			    var i = 0;

			    while (i < input.length) {
			        chr1 = input[i++];
			        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
			        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

			        enc1 = chr1 >> 2;
			        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			        enc4 = chr3 & 63;

			        if (isNaN(chr2)) {
			            enc3 = enc4 = 64;
			        } else if (isNaN(chr3)) {
			            enc4 = 64;
			        }
			        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
			                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
			    }
			    return output;
			}

			var getImageUrl = function(arrayBuffer, imageType) {
				// console.log(arrayBuffer);
				var bytes = new Uint8Array(arrayBuffer);
				//'data:image/png;base64,'+encode(bytes);
			 	var blob = new Blob([arrayBuffer], {type: 'data:' + imageType + ';base64'});
     			return URL.createObjectURL(blob);
			};

			var createRandomId = function()
			{
			    var text = "";
			    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			    for( var i=0; i < 5; i++ )
			        text += possible.charAt(Math.floor(Math.random() * possible.length));

			    return text;
			}

			var getImageUrls = function(images) {
				var promises = [];

				for(var i = 0; i < images.length; i++){
					promises.push(getImageUrl(images[i].arrayBuffer));
				}

				return $q.all(promises);
			};

			factory.fetchfrontImagesFromServer = function() {
 				return factory.getAll()
 					.then(function(properties) {
						return fetchFrontImages(properties);
					}
				); 
			};

			factory.getImagesForProperty = function(propertyId) {
				return imageIndexDBService.getForProperty(propertyId)
					.then(imageIndexDBService.getMultiple)
					.then(getImageUrls);
			};

			factory.addImage = function(propertyId, file){
	    		// var blob = new Blob([file], {type:'image'});
				return imageIndexDBService.add(propertyId, createRandomId(), file, 'image/jpg')
			};

			/*************************************
			**************sketches****************
			*************************************/
			var fetchBuildingSketch = function(propertyId, building) {
				return propertyApiService.getImage('/images/Sketches/' + propertyId + '-' + building + '.jpg')
					.then(
						function(sketchData) {
							return sketchIndexDBService.add(propertyId, building, sketchData, 'image/jpg');
						}
					);
			};

			var fetchBuildingsSketches = function(property) {
				var promises = [];

				for(var i = 0; i < property.Buildings.length; i++){
					promises.push(fetchBuildingSketch(property.Id, property.Buildings[i].Id));
				}

				return $q.all(promises);
			};

			var fetchPropertySketches = function(id) {
				return propertyIndexDBService.get(id).then(function(property) {
					return fetchBuildingsSketches(property);
				});
			};

			var fetchSketches = function(properties) {
				var promises = [];
				for(var i = 0; i < properties.length; i++) {
					promises.push(fetchPropertySketches(properties[i].Id));
				}
				return $q.all(promises);
			};

			factory.fetchSketchesFromServer = function() {
				return factory.getAll()
					.then(function(properties){
						return fetchSketches(properties);
					});
			};

			var addImageUrl = function(item){
				var deferred = $q.defer();

				item.url = getImageUrl(item.arrayBuffer, item.type);
				deferred.resolve(item);

				return deferred.promise;
			};

			var addImageUrls = function(items){
				var promises = [];

				for(var i =0; i < items.length; i++){
					promises.push(addImageUrl(items[i]));
				}

				return $q.all(promises);
			};

			factory.getSketchesForProperty = function(propertyId) {
				return sketchIndexDBService.getForProperty(propertyId)
				.then(sketchIndexDBService.getMultiple)
				.then(addImageUrls);
			};

			factory.getBuildingSketch = function(propertyId, buildingId) {
				return sketchIndexDBService.getForBuilding(propertyId, buildingId)
				.then(addImageUrl);
			};

			return factory;
}]);	
