var components = angular.module('components');

components.component('directions',
{
    bindings: {
        'waypoints': '<',
        'directionscallback': '&',
        'origin': '<',
        'destination': '<',
        'waypointoptimized': '<',
        'travelmode': '<'
    },
    template: '<div id="map"></div>',
    controller: ['$q', function ($q) {
   	 	var vm = this;

        vm.$onInit= function() {
            console.log('directions init');
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: 40.771, lng: -73.974}
            });

            vm.directionsDisplay = new google.maps.DirectionsRenderer;
            vm.directionService = new google.maps.DirectionsService;
            vm.directionsDisplay.setMap(vm.map);
        };

        var calculateAndDisplayRoute = function() {
          if(vm.map && vm.waypoints && vm.origin && vm.destination) {
              return getRoute()
                .then(drawRoute)
                .then(updateDirectionsCallback);
        	}
        };

        var getRoute = function(options) {
            var deferred = $q.defer();
            var options = getOptions();

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

        var getOptions = function() {
	        if(!vm.waypointOptimized) {
	        	vm.waypointOptimized = true;
	        }

	        if(!vm.travelmode) {
	        	vm.travelmode = "DRIVING";
	        }
	        
            return {
            	origin: vm.origin,
            	destination: vm.destination,
            	waypoints: vm.waypoints,
            	travelMode: vm.travelmode,
            	optimizeWaypoints: vm.waypointoptimized
            };
        };

        var updateDirectionsCallback = function(response) {
            var deferred = $q.defer();
            vm.directionscallback({routes:response});
            deferred.resolve();
            return deferred.promise;
        };

        var drawRoute = function(response) {
            var deferred = $q.defer();
            vm.directionsDisplay.setDirections(response);
            deferred.resolve(response);
            return deferred.promise;
        };

        vm.$onChanges = function(changes){
            calculateAndDisplayRoute();
        };
    }]
});