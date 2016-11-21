angular.module('repos')
    .factory('propertyDBRepo', ['$q', 'indexDBUtility',
        function($q, indexDBUtility) {
            var factory = {};
            var _properties;
            var store = "properties";
 
            factory.getAll = function() {
                return indexDBUtility.getAll(store);
            };

            factory.get = function(id) {
                return indexDBUtility.get(store, id);
            };

            factory.getMultiple = function(ids){
                var promises = [];
                console.log('iddines:', ids);

                for(var i =0; i < ids.length; i++) {
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises).then(
                    function(result){
                        console.log('listofimage: ', result);
                    }
                );
            };

            factory.update = function(property) {
                return indexDBUtility.put(store, property);
            };

            factory.exists = function(id) {
                return indexDBUtility.exists(store, id);
            };

            factory.add = function(property) {
                return indexDBUtility.add(store, property);
            };

            factory.getCompleted = function() {
                return indexDBUtility.getByIndex(store, "Completed", "true");
            };

            factory.delete = function(id) {
                return indexDBUtility.delete(store, id);
            };

            return factory;
        }]);