 angular.module('repos')
    .factory('imageDBRepo', ['$q', 'indexDBUtility',
        function($q, indexDBUtility) {
            var factory = {};
            var _properties;
            var store = "images";
 
            factory.getAll = function() {
                return indexDBUtility.getAll(store);
            };

            factory.get = function(id) {
                return indexDBUtility.get(store, id);
            };

            factory.getMultiple = function(ids){
                var promises = [];

                for(var i =0; i < ids.length; i++){
                    promises.push(factory.get(ids[i]));
                }

                return $q.all(promises);
            };

            factory.update = function(property) {
                return indexDBUtility.put(store, property);
            };

            factory.exists = function(id) {
                return indexDBUtility.exists(store, id);
            };

            factory.add = function(propertyid, id, data, imageType) {
                var deferred = $q.defer();

                indexDBUtility.add(store, {propertyId: propertyid, id: id, date: new Date(), arrayBuffer: data, imageType: imageType})
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
                return indexDBUtility.getByIndex(store, "propertyId", propertyId);
            };

            factory.delete = function(id) {
                return indexDBUtility.delete(store, id);
            };

            return factory;
        }
    ]
);