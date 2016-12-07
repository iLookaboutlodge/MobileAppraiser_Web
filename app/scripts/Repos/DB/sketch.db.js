angular.module('repos')
    .factory('sketchDBRepo', ['$q', 'indexDBUtility',
        function($q, indexDBUtility) {
            var factory = {};
            var _properties;
            var store = "sketches";
 
            factory.getAll = function() {
                return indexDBUtility.getAll(store);
            }

            factory.get = function(id) {
                return indexDBUtility.get(store, id);
            }

            factory.getMultiple = function(ids){
                var promises = [];
                for(var i =0; i < ids.length; i++){
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises);
            }

            factory.update = function(property) {
                return indexDBUtility.put(store, property);
            }

            factory.exists = function(id) {
                return indexDBUtility.exists(store, id);
            }

            factory.add = function(propertyid, building, data, type) {
                var deferred = $q.defer();
                var entry = {propertyId: propertyid, buildingId: building, arrayBuffer: data, type: type};
                indexDBUtility.add(store, entry)
                .then(
                    function(item){
                        deferred.resolve(item);
                    },
                    function(e) {
                        //console.log('failed to add sketch', e);
                        deferred.resolve();
                    }
                );
                
                return deferred.promise;
            }

            factory.getForProperty = function(propertyId) {
                return indexDBUtility.getByIndex(store, "propertyId", propertyId);
            }

            factory.getForBuilding = function(property, building) {
                var key = [property, parseInt(building)];
                return indexDBUtility.get(store, key);
            }

            factory.delete = function(id) {
                return indexDBUtility.delete(store, id);
            }

            return factory;
        }
    ]
);