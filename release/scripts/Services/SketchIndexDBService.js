angular.module('sketchIndexDB', ['indexDB'])
    .factory('sketchIndexDBService', ['$q', 'indexDBService',
        function($q, indexDBService) {
            var factory = {};
            var _properties;
            var store = "sketches";
 
            factory.getAll = function() {
                return indexDBService.getAll(store);
            }

            factory.get = function(id) {
                return indexDBService.get(store, id);
            }

            factory.getMultiple = function(ids){
                var promises = [];

                for(var i =0; i < ids.length; i++){
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises);
            }

            factory.update = function(property) {
                return indexDBService.put(store, property);
            }

            factory.exists = function(id) {
                return indexDBService.exists(store, id);
            }

            factory.add = function(propertyid, building, data, type) {
                var deferred = $q.defer();

                indexDBService.add(store, {propertyId: propertyid, buildingId: building, arrayBuffer: data, type: type})
                .then(
                    function(item){
                        deferred.resolve(item);
                    },
                    function() {
                        deferred.resolve();
                    }
                );
                
                return deferred.promise;
            }

            factory.getForProperty = function(propertyId) {
                return indexDBService.getByIndex(store, "propertyId", propertyId);
            }

            factory.getForBuilding = function(property, building) {
                var key = [property, parseInt(building)];
                return indexDBService.get(store, key);
            }

            factory.delete = function(id) {
                return indexDBService.delete(store, id);
            }

            return factory;
        }
    ]
);