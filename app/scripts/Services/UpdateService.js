angular.module('update',['property'])
	.factory('updateService', ['$q', '$rootScope', 'propertyService',
		function($q, $rootScope,  propertyService){
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
					.then(propertyService.fetchfrontImagesFromServer)
					.then(propertyService.fetchSketchesFromServer)
					.then(updateScopeAndPromise);
				}

				return updatePromise.promise;
			}

			return factory;
		}
	]);