var components = angular.module('components');

components.component('scheduled', {
    bindings: {
        'properties': '<'
    },
    templateUrl: 'Properties/scheduled/scheduled.html',
    controller: ['$state', '$filter', '$q', 'imageService', function($state, $filter, $q, imageService) {
        var vm = this;
        vm.filteredProperties = [];
        vm.selectedProperty = null;
        vm.showList = true;

        var alphabet = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        vm.$onChanges = function(changes) {
            if (vm.properties) {
                vm.filteredProperties = $filter('filter')(vm.properties, { WorkStatus: "scheduled" }, true);
            }
        };

        vm.updatelocation = function(start, end){
            vm.start = start;
            vm.end = end;
        };

        vm.propertyselected = function(selected) {
            vm.showList = false;
            vm.selectedProperty = selected;
        };

        vm.tolist = function() {
            vm.showList = true;
            vm.selectedProperty = null;
        };

        vm.goToUnscheduled = function() {
            $state.go("properties.unscheduled");
        };

        vm.directionscallback = function(routes) {

            if (routes && routes.length >= 1) {

                var order = routes[0].waypoint_order;

                for (var i = 0; i < vm.filteredProperties.length; i++) {
                    vm.filteredProperties[i].order = parseInt(order[i]);
                    vm.filteredProperties[i].markerLetter = alphabet[order[i]];
                }
            }

        };

        return vm;
    }]
});