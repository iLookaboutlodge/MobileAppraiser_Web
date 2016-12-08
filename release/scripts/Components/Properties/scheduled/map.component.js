var components = angular.module('components');

components.component('scheduledmap', {
    bindings: {
        'properties': '<',
        'start': '<',
        'end': '<',
        'directionscallback': '&'
    },
    templateUrl: 'Properties/scheduled/map.html',
    controller: ['$q', 'locationService', function($q, locationService) {
        var vm = this;
        var defaultLocation = 'Toronto';

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
                locationService.getCurrentGeoLocation().then(
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