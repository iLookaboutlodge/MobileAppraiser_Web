var components = angular.module('components');

components.component('mapcomponent',
{
    templateUrl: './scripts/components/Map/map.html',
    bindings: {
        'properties': '<',
        'directionscallback': '&'
    },
    controller: ['$scope', '$state', '$window', '$q', '$filter','locationService', function ($scope, $state, $window, $q, $filter, locationService) {
        var vm = this;
        vm.markers = [];
        var defaultLocation = "Toronto";

        var getWaypoint = function(property) {
            var deferred = $q.defer();
            deferred.resolve({ location: property.Address.Address, stopover: true});
            return deferred.promise;
        };

        var getWaypoints = function() {
            var promises = [];
            
            for (var i = 0; i < vm.properties.length; i++) {
                 promises.push(getWaypoint(vm.properties[i]));
            }

            return $q.all(promises);
        };

        var getDestinations = function() {
            var destinations = [];
            for (var i = 0; i < vm.properties.length; i++) {
                destinations.push(new google.maps.LatLng(vm.properties[i].Location.Latitude, vm.properties[i].Location.Longitude));
            }
            return destinations;
        };

        vm.distancescallback = function(distances){
            console.log('distances', distances);
        };

        var getLocation = function(location) {
            var deferred = $q.defer();

            if (location && location != "") {
                deferred.resolve(location);
            }
            else {
                locationService.getCurrentGeoLocation().then(
                    function(currentLocation){
                        deferred.resolve(currentLocation.coords.latitude + "," + currentLocation.coords.longitude);
                    },
                    function(){
                        deferred.resolve(defaultLocation);
                    }
                );
            }
            
            return deferred.promise;
        };

        vm.$onChanges = function(changes){
            console.log('stuff changed');
            getWaypoints().then(function(waypoints){
                vm.waypoints = waypoints;
            });
            vm.destinations = getDestinations();
        };

        vm.$onInit = function() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: 40.771, lng: -73.974}
            }); 

            getWaypoints().then(function(waypoints){
                console.log('waypoints', waypoints);
                vm.waypoints = waypoints;
            });

            getLocation().then(function(location){
                vm.origin = location;
                vm.destination = location;
            });

            vm.destinations = getDestinations();
        };
    }]
});