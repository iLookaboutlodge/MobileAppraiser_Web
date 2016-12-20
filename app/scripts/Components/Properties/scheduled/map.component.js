var components = angular.module('components');

components.component('scheduledmap', {
    bindings: {
        'properties': '<',
        'start': '<',
        'end': '<',
        'directionscallback': '&',
        'onpropertyselected': '&',
        'selectedpropertyindex': '<'
    },
    templateUrl: 'Properties/scheduled/map.html',
    controller: ['$q', '$rootScope', '$scope', 'locationService', function($q, $rootScope, $scope, locationService) {
        var vm = this;
        var defaultLocation = 'Toronto';
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        vm.zoom = 14;
        vm.center = {lat: -25.363, lng: 131.044};
        vm.directionService = new google.maps.DirectionsService;

        vm.$onChanges = function(changes) {

            if(changes.start || changes.end || changes.properties){

                var setOrigin =  getLocation(vm.start)
                    .then(function(location){
                        vm.origin = location;
                });
  
                var setDestination = getLocation(vm.end)
                    .then(function(location) {
                        vm.destination = location;
                    }
                );
            
 
                var setWaypointsAndOptions = function(){
                    var deferred = $q.defer();
                    var waypoints = getWaypoints(vm.properties);
                    var options = getOptions(waypoints, vm.origin, vm.destination);
                    deferred.resolve(options);
                    return deferred.promise;
                };
            
                setOrigin
                .then(setDestination)
                .then(setWaypointsAndOptions)
                .then(getRoute)
                .then(setRouteAndMarkers)
                .then(vm.directionscallback);
            }

            if(changes.selectedpropertyindex && vm.markers){
                
                disableBounce(vm.markers);

                if(vm.selectedpropertyindex != null && vm.selectedpropertyindex != undefined) {
                    console.log('select marker');
                    var marker = getPropertyMarker(vm.selectedpropertyindex);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    vm.center = marker.getPosition();
                    vm.zoom = 10;
                }
                else {
                    $scope.$broadcast('resetView');
                }
            }
         };

        vm.propertiesExist = function() {
            return vm.properties && vm.properties.length > 0;
        };

        var getPropertyMarker = function(selectedIndex){
            // + 1 to negate starting marker - current location
            return vm.markers[selectedIndex+1];
        };

        var disableBounce = function(markers) {
            if(vm.markers){
                for(var i = 0; i < markers.length; i++){
                    markers[i].setAnimation(null);
                }
            }
        };
                    
        var setRouteAndMarkers = function(route){
            vm.route = route;
            vm.markers = createMarkers(route);
            return route;
        };

        var orderProperties = function() {
            var deferred = $q.defer();
            vm.orderedProperties
        };

        var createMarkers = function(route) {
            var markers = [];
            var legs = route.routes[0].legs;

            for (var i = 0; i < legs.length; i++){
                
                if(i == 0){
                    var startmarker = createMarker(legs[i].start_location);
                    startmarker.setIcon("https://maps.google.com/mapfiles/kml/paddle/go.png");
                    markers.push(startmarker);
                }

                var waypointMarker = createMarker(legs[i].end_location);

                if (i < legs.length - 1){
                    addMarkerListener(waypointMarker, route.routes[0].waypoint_order, i);
                    addIconLetter(waypointMarker, i);
                }
                else {
                    waypointMarker.setIcon("https://maps.google.com/mapfiles/kml/paddle/stop.png");
                }

                markers.push(waypointMarker);
            }

            return markers;
        };

        var createMarker = function(location){
             var marker = new google.maps.Marker(
            {
                position: location
            });
         
            return marker;
        };

        var addIconLetter = function(marker, i){
            marker.setIcon('http://maps.google.com/mapfiles/marker' + letters[i] + '.png');
        };

        var addMarkerListener = function(marker, routeOrder, i){
            marker.addListener('click', function(){
                disableBounce(vm.markers);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                vm.onpropertyselected({index:i});
                if(!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        }
        
        var getOptions = function(waypoints, origin, destination) {       
            return {
            	origin: origin,
            	destination: destination,
            	waypoints: waypoints,
            	travelMode: "DRIVING",
            	optimizeWaypoints: true
            };
        };

        var disableBounce = function(markers) {
            for(var i = 0; i < markers.length; i++){
                markers[i].setAnimation(null);
            }
        };

        var getWaypoints = function(properties) {
            var deferred = $q.defer();

            var waypoints = [];
            if(properties){
                for (var i = 0; i < properties.length; i++) {
                    waypoints.push({ location: properties[i].Address.Address, stopover: true });
                }
            }

            return waypoints;
        };

        var getLocation = function(location) {;
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

        var getRoute = function(options) {
            var deferred = $q.defer();

            vm.directionService.route(options,
                function(response, status) {
                    if(status === 'OK'){
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject(status);
                    }
                }
            );

            return deferred.promise;
        };
    }]
});