var components = angular.module('components');

components.component('scheduledmap', {
    bindings: {
        'properties': '<',
        'start': '<',
        'end': '<',
        'directionscallback': '&'
    },
    templateUrl: 'Properties/scheduled/scheduled.map.html',
    controller: ['$q', function($q) {
        var vm = this;
        vm.defaultLocation = 'Toronto';

        vm.$onChanges = function(changes) {

            getLocation(vm.start).then(function(location){
                vm.origin = location;
            });

            getLocation(vm.end).then(function(location) {
                vm.destination = location;
            });

            getWaypoints(vm.properties).then(
                function(waypoints) {
                    vm.waypoints = waypoints;
                }
            );
         };

        vm.updateLocations = function() {
            getLocation(vm.start).then(function(location) {
                vm.origin = location;
            });

            getLocation(vm.end).then(function(location) {
                vm.destination = location;
            });
        };

        vm.propertiesExist = function() {
            return vm.properties && vm.properties.length > 0;
        };

        var getCurrentPosition = function() {
            var deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, { timeout: 5000 });
            } else {
                deferred.reject("browser does not support geo location");
            }

            return deferred.promise;
        };

        var getWaypoint = function(property) {
            var deferred = $q.defer();
            deferred.resolve({ location: property.Address.Address, stopover: true });
            return deferred.promise;
        };

        var getWaypoints = function(properties) {
            var promises = [];
            if(properties){
                for (var i = 0; i < properties.length; i++) {
                    promises.push(getWaypoint(properties[i]));
                }
            }

            return $q.all(promises);
        };


        var getLocation = function(location) {
            var deferred = $q.defer();

            if (location && location != "") {
                deferred.resolve(location);
            } else {
                getCurrentPosition().then(
                    function(currentLocation) {
                        deferred.resolve(currentLocation.coords.latitude + "," + currentLocation.coords.longitude);
                    },
                    function() {
                        deferred.resolve(defaultLocation);
                    }
                );
            }

            return deferred.promise;
        };
    }]
});