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
        vm.routeOrder = [];

        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        vm.$onInit = function() {
           vm.updatepropertylist();
        };

        vm.updatelocation = function(start, end){
            vm.start = start;
            vm.end = end;
        };

        vm.propertyselected = function(index) {
            vm.showList = false;
            var propertyIndex = getSelectedPropertyIndexFromOrder(index);
            vm.selectedIndex = index;
            vm.selectedProperty = vm.scheduledProperties[propertyIndex];
        };

        vm.tolist = function() {
            vm.showList = true;
            vm.selectedProperty = null;
            vm.selectedIndex = null;
        };

        vm.goToUnscheduled = function() {
            $state.go("properties.unscheduled");
        };

        vm.completeProperty = function(property){
           return propertyService.completeProperty
                .then(getScheduledProperties)
                .then(setProperties);
        };

        vm.unscheduleProperty = function(property){        
            propertyService.unScheduleProperty
                .then(vm.updatepropertylist);
        };

        vm.directionscallback = function(routes) {
            if (routes && routes.length >= 1) {
                vm.routeOrder = routes[0].waypoint_order;
                setPropertyOrder();
            }
            vm.loading = false;
        };

        vm.updatepropertylist = function(){
            vm.loading = true;

             return propertyService.getScheduledProperties()
                .then(setProperties);
        };

        var setPropertyOrder = function(){

            for(var i = 0; i < vm.routeOrder.length; i++){
                var propertyIndex = vm.routeOrder[i];
                var property = vm.scheduledProperties[propertyIndex];
                
                property.order = i;
                property.markerLetter = alphabet[i];
            }
        };

        var getSelectedPropertyIndexFromOrder = function(propertyIndex){
            return vm.routeOrder[propertyIndex];
        }

        var setProperties = function(properties){
            vm.scheduledProperties = properties;
        };

        return vm;
    }]
});