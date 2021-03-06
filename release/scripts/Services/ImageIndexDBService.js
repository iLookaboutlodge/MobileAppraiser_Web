 angular.module('imageIndexDB', ['indexDB'])
    .factory('imageIndexDBService', ['$q', 'indexDBService',
        function($q, indexDBService) {
            var factory = {};
            var _properties;
            var store = "images";
 
            factory.getAll = function() {
                return indexDBService.getAll(store);
            };

            factory.get = function(id) {
                return indexDBService.get(store, id);
            };

            factory.getMultiple = function(ids){
                var promises = [];

                for(var i =0; i < ids.length; i++){
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises);
            };

            factory.update = function(property) {
                return indexDBService.put(store, property);
            };

            factory.exists = function(id) {
                return indexDBService.exists(store, id);
            };

            factory.add = function(propertyid, id, data, imageType) {
                var deferred = $q.defer();

                indexDBService.add(store, {propertyId: propertyid, id: id, date: new Date(), arrayBuffer: data, imageType: imageType})
                    .then(
                        function(item){
                            deferred.resolve(item);
                        },
                        function(e){
                            //console.log(e);
                            deferred.resolve();
                        }
                    );
            
                return deferred.promise;
            };

            factory.getForProperty = function(propertyId) {
                return indexDBService.getByIndex(store, "propertyId", propertyId);
            };

            factory.delete = function(id) {
                return indexDBService.delete(store, id);
            };

            return factory;
        }
    ]
);