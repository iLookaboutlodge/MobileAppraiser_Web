var components = angular.module('components');

components.component('scheduled', {
    bindings: {
        'properties': '<'
    },
    templateUrl: 'Properties/scheduled/scheduled.html',
    controller: ['$state', 'propertyService', function($state, propertyService) {
        var vm = this;
        vm.selectedProperty = null;
        vm.showList = true;

        var alphabet = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        vm.$onInit = function() {
           vm.updatepropertylist();
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

        vm.completeProperty = function(property){
           propertyService.completeProperty
                .then(getScheduledProperties)
                .then(setProperties);
        };

        vm.unscheduleProperty = function(property){
            propertyService.unScheduleProperty
                .then(vm.updatepropertylist);
        };

        vm.directionscallback = function(routes) {
            if (routes && routes.length >= 1) {

                var order = routes[0].waypoint_order;

                for (var i = 0; i < vm.scheduledProperties.length; i++) {
                    vm.scheduledProperties[i].order = parseInt(order[i]);
                    vm.scheduledProperties[i].markerLetter = alphabet[order[i]];
                }
            }
        };

        vm.updatepropertylist = function(){
             return propertyService.getScheduledProperties()
                .then(setProperties);
        };

        var setProperties = function(properties){
            vm.scheduledProperties = properties;
        };

        return vm;
    }]
});