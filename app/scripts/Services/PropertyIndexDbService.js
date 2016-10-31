angular.module('propertyIndexDB', ['indexDB'])
    .factory('propertyIndexDBService', ['$q', 'indexDBService',
        function($q, indexDBService) {
            var factory = {};
            var _properties;
            var store = "properties";
 
            factory.getAll = function() {
                return indexDBService.getAll(store);
            }

            factory.get = function(id) {
                return indexDBService.get(store, id);
            }

            factory.getMultiple = function(ids){
                var promises = [];
                console.log('iddines:', ids);

                for(var i =0; i < ids.length; i++){
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises).then(
                    function(result){
                        console.log('listofimage: ', result);
                    }
                );
            }

            factory.update = function(property) {
                return indexDBService.put(store, property);
            }

            factory.exists = function(id) {
                return indexDBService.exists(store, id);
            }

            factory.add = function(property) {
                return indexDBService.add(store, property);
            }

            factory.getCompleted = function() {
                return indexDBService.getByIndex(store, "Completed", "true");
            }

            factory.delete = function(id) {
                return indexDBService.delete(store, id);
            }

            return factory;
        }]);