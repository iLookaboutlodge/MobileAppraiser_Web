angular.module('property', ['propertyApi', 'propertyIndexDB', 'imageIndexDB'])
	.factory('propertyService', ['$q', 'propertyApiService', 'propertyIndexDBService', 'imageIndexDBService',
		function($q, propertyApiService, propertyIndexDBService, imageIndexDBService) {
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

			//IMAGES
			var fetchfrontImageFromServer = function(id) {
				propertyApiService.getImage('/images/Properties/' + id + '.jpg')
					.then(
						function(imageData) {
							imageIndexDBService.add(id, id, imageData);
						}
					);
			}

			var getImageUrl = function(blob) {
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

			var dataURItoBlob = function dataURItoBlob(dataURI) {
			  // convert base64 to raw binary data held in a string
			  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
			  var byteString = atob(dataURI.split(',')[1]);

			  // separate out the mime component
			  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

			  // write the bytes of the string to an ArrayBuffer
			  var ab = new ArrayBuffer(byteString.length);
			  var ia = new Uint8Array(ab);
			  for (var i = 0; i < byteString.length; i++) {
			      ia[i] = byteString.charCodeAt(i);
			  }

			  // write the ArrayBuffer to a blob, and you're done
			  var blob = new Blob([ab], {type: mimeString});
			  return blob;
			}

			var getImageUrls = function(images) {
				var promises = [];

				for(var i = 0; i < images.length; i++){
					promises.push(getImageUrl(images[i].blob));
				}

				return $q.all(promises);
			};

			factory.fetchfrontImagesFromServer = function() {
 				factory.getAll()
 					.then(function(properties){
						for(var i = 0; i < properties.length; i++) {
							fetchfrontImageFromServer(properties[i].Pin);
						}
					}
				);
			};

			factory.getImagesForProperty = function(propertyId) {
				return imageIndexDBService.getForProperty(propertyId)
					.then(imageIndexDBService.getMultiple)
					.then(getImageUrls);
			};

			factory.addImage = function(propertyId, file){
	    		var blob = new Blob([file], {type:'image'});
				return imageIndexDBService.add(propertyId, createRandomId(), blob)
			}

			return factory;
}]);	
