angular.module('services')
	.factory('locationService', ['$q','propertyService', function($q, propertyService) {
			var factory = {};
            var distanceService = new google.maps.DistanceMatrixService;

            factory.getCurrentGeoLocation = function(){
                var deferred = $q.defer();
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, {timeout: 5000});
                }
                else {
                    deferred.reject("browser does not support geo location");
                }

                return deferred.promise;
            };

            factory.getPropertyDistances = function(properties){
               return getDestinations(properties)
                    .then(getGoogleDistanceMatrixOptions)
                    .then(callGoogleDistanceMatrixApi)
                    .then(updateProperties.bind(null, properties));
            };

            factory.updatePropertyDistances = function(properties) {
                return factory.getPropertyDistances(properties)
                    .then(propertyService.updateAll);
            };

            var updateProperties = function(properties, response) {
                var promises = [];
                for (var i = 0; i < properties.length; i++){
                    promises.push(setPropertyDistance(properties[i], response.rows[0].elements[i]));
                }

                return $q.all(promises);
            };

            var setPropertyDistance = function(property, distance){
                var deferred = $q.defer();
                property.distance = distance;
                deferred.resolve(property);
                return deferred.promise;
            }

            var callGoogleDistanceMatrixApi = function (options) {
                var deferred = $q.defer();
                distanceService.getDistanceMatrix(options,
                    function(response, status){
                        if(status === 'OK') {
                            deferred.resolve(response);
                        }
                        else {
                            deferred.reject(status);
                        }
                    }
                );
                return deferred.promise;
            };

            var getGoogleDistanceMatrixOptions = function(destinations) {
                var deferred = $q.defer();
                factory.getCurrentGeoLocation().then(function(location){
                    var googleLatLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                    var options = {
                        origins: [googleLatLng],
                        destinations: destinations,
                        travelMode: 'DRIVING'
                    };
                    deferred.resolve(options); 
                });

                return deferred.promise;                                
            };

            var getDestinations = function(properties) {
                var promises = [];

                for (var i = 0; i < properties.length; i++) {
                    promises.push(getGoogleLatLng(properties[i].Location.Latitude, properties[i].Location.Longitude));
                }

                return $q.all(promises);
            };

            var getGoogleLatLng = function(lat, long){
                var deferred = $q.defer();
                deferred.resolve(new google.maps.LatLng(lat, long)); 
                return deferred.promise;
            };

            return factory;
        }]
    );