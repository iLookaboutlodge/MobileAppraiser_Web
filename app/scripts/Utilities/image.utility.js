angular.module('utilities')
    .factory('imageUtility',['$q',
        function ($q) {
            var factory = {};

            factory.getImageUrlFromArrayBuffer = function(arrayBuffer, imageType) {
                var deferred = $q.defer();
                var bytes = new Uint8Array(arrayBuffer);
                var blob = new Blob([arrayBuffer], {type: 'data:' + imageType + ';base64'});
                deferred.resolve(URL.createObjectURL(blob));
                return deferred.promise;
            };

            return factory;
        }]
    );