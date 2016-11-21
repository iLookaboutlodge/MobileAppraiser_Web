angular.module('services')
	.factory('sketchService', ['$q', 'propertyApiRepo', 'propertyDBRepo', 'sketchDBRepo','imageUtility',
		function($q, propertyApiRepo, propertyDBRepo, sketchDBRepo, imageUtility) {
			var factory = {};

			/*******************
			Private Methods 
			********************/
			var fetchBuildingSketch = function(propertyId, building) {
				return propertyApiRepo.getImage('/images/Sketches/' + propertyId + '-' + building + '.jpg')
					.then(
						function(sketchData) {
							return sketchDBRepo.add(propertyId, building, sketchData, 'image/jpg');
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
				return propertyDBRepo.get(id).then(function(property) {
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

			var addImageUrl = function(item){
				var deferred = $q.defer();

				imageUtility.getImageUrlFromArrayBuffer(item.arrayBuffer, item.type).then(
					function(url){
						item.url = url;
						deferred.resolve(item);
					});

				return deferred.promise;
			};

			var addImageUrls = function(items){
				var promises = [];

				for(var i =0; i < items.length; i++){
					promises.push(addImageUrl(items[i]));
				}

				return $q.all(promises);
			};

			/*******************
			Public Methods 
			********************/
			factory.fetchSketchesFromServer = function() {
				return propertyDBRepo.getAll()
					.then(function(properties){
						return fetchSketches(properties);
					});
			};

			factory.getSketchesForProperty = function(propertyId) {
				return sketchDBRepo.getForProperty(propertyId)
				.then(sketchDBRepo.getMultiple)
				.then(addImageUrls);
			};

			factory.getBuildingSketch = function(propertyId, buildingId) {
				return sketchDBRepo.getForBuilding(propertyId, buildingId)
				.then(addImageUrl);
			};

			return factory;
}]);