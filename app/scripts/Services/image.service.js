angular.module('services')
	.factory('imageService', ['$q', 'propertyApiRepo', 'imageDBRepo', 'imageUtility',
		function($q, propertyApiRepo, imageDBRepo, imageUtility) {
			var factory = {};

			var fetchfrontImage = function(id) {
				return propertyApiRepo.getImage('/images/Properties/' + id + '.png')
					.then(
						function(imageData) {
							return imageDBRepo.add(id, id, imageData, 'image/png');
						}
					);
			};

			var fetchFrontImages = function(properties) {
				var promises = [];
				
				for(var i = 0; i < properties.length; i++) {
					promises.push(fetchfrontImage(properties[i].Id));
				}

				return $q.all(promises);
			};

			var createRandomId = function()
			{
			    var text = "";
			    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			    for( var i=0; i < 5; i++ )
			        text += possible.charAt(Math.floor(Math.random() * possible.length));

			    return text;
			};

			var getImageUrls = function(images) {
				var promises = [];

				for(var i = 0; i < images.length; i++){
					promises.push(imageUtility.getImageUrlFromArrayBuffer(images[i].arrayBuffer));
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
				return imageDBRepo.getForProperty(propertyId)
					.then(imageDBRepo.getMultiple)
					.then(getImageUrls);
			};

			factory.addImage = function(propertyId, file){
				return imageDBRepo.add(propertyId, createRandomId(), file, 'image/jpg')
			};

			return factory;
}]);