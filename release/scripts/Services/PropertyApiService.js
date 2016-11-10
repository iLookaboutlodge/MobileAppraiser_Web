angular.module('propertyApi', ['config'])
    .config(['$httpProvider', function ($httpProvider) {    
        $httpProvider.defaults.useXDomain = true;    
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['Origin'];
    }])
    .factory('propertyApiService', ['$http','$q','ENV',
        function($http, $q, ENV) {
            var factory = {};
            var _properties;

            factory.getPropertiesFromApi = function() {
                return $http({
                    method: 'GET',
                    url: ENV.apiEndpoint + "/api/propertydetails/GetAll"
                }).then(function(response){
                    return response.data;
                });
            };

            factory.getIds = function() {
                return $http({
                    method: 'GET',
                    url: ENV.apiEndpoint + "/api/propertydetails/GetPropertyIdList"
                }).then(function(response){
                    return response.data;
                });
            }

            factory.getProperty = function(propertyId) {
                return $http({
                    method: 'GET',
                    url: ENV.apiEndpoint + "/api/propertydetails/GetProperty_v2?propertyId=" + propertyId
                }).then(function(response){
                    return response.data;
                });
            }

            factory.update = function(property) {
                var deferred = $q.defer();

                return $http({
                    method: 'POST',
                    url: ENV.apiEndpoint + "/api/propertydetails/Update",
                    data: property
                }).then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(e) {
                        deferred.reject(e);
                    }
                );

                return deferred.promise;
            }

            factory.getImage = function(url) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: url,
                    responseType: 'arraybuffer'
                }).then(
                    function(response){
                        deferred.resolve(response.data)
                    },
                    function(e){
                        console.log(e);
                        deferred.resolve();
                    }
                );

                return deferred.promise;
            }
 
            return factory;
        }]);