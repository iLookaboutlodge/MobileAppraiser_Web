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

            factory.add = function(propertyid, building, data) {
                return indexDBService.add(store, {propertyId: propertyid, building: building, blob: data});
            }

            factory.getForProperty = function(propertyId) {
                return indexDBService.getByIndex(store, "propertyId", propertyId);
            }

            factory.delete = function(id) {
                return indexDBService.delete(store, id);
            }

            return factory;
        }
    ]
);