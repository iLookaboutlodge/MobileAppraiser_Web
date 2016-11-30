var components = angular.module('components');

components.component('distances',
{
    bindings: {
        'locations': '<',
        'map': '<',
        'origin': '<',
        'destinations': '<',
        'travelMode': '<',
        'distancescallback': '&'
    },
    controller: ['$q', function ($q) {
   	 	var vm = this;

        var calculateDistances = function() {
            if(vm.map && vm.origin && vm.destinations) {  
                return getDistances()
                    .then(function(response){
                        vm.distancescallback({distances:response});
                    });
            }
        };

        var getOptions = function() {
            if(!vm.travelmode) {
                vm.travelmode = "DRIVING";
            }

            return {
                origins: [vm.origin],
                destinations: vm.destinations,
                travelMode: vm.travelmode
            };
        };

        var getDistances = function() {
            var deferred = $q.defer();
            var options = getOptions();
            console.log('options', options);

            vm.distanceService.getDistanceMatrix(options,
                function(response, status){
                    if(status === 'OK') {
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject(status);
                    }
                });

            return deferred.promise;
        };

        vm.$onChanges = function(changes) {
            calculateDistances();
        };

        vm.$onInit = function() {
            vm.distanceService = new google.maps.DistanceMatrixService();
            calculateDistances();
        };
    }]
});