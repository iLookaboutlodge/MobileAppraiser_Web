angular.module('services')
	.factory('updateService', ['$q', '$rootScope', 'propertyService','imageService','sketchService',
		function($q, $rootScope,  propertyService, imageService, sketchService){
			var factory = {};
			$rootScope.updating = false;
			var updatePromise;

			var updateScopeAndPromise = function(){
				var deferred = $q.defer();

				$rootScope.updated = new Date().getTime();
				$rootScope.updating = false;

				updatePromise.resolve();
				deferred.resolve();
				return deferred.promise;
			}

			factory.update = function(){
				if(!$rootScope.updating)
				{	
					updatePromise = $q.defer();
					$rootScope.updating = true;

					propertyService.sendCompletedPropertiesToServer()
					.then(propertyService.fetchNewPropertiesFromServer)
					.then(imageService.fetchfrontImagesFromServer)
					.then(sketchService.fetchSketchesFromServer)
					.then(updateScopeAndPromise);
				}

				return updatePromise.promise;
			}

			return factory;
		}
	]);