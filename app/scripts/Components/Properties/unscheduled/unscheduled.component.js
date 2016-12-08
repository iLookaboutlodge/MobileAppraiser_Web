var components = angular.module('components');

components.component('unscheduled',
{
	bindings: {
		'properties': '<'
	},
	templateUrl: 'Properties/unscheduled/unscheduled.html',
	controller: ['$rootScope','propertyService', 'locationService', function($rootScope, propertyService, locationService){
		var vm = this;
		vm.showList = true;

		vm.$onInit = function() {
           vm.updatepropertylist();
        };

		vm.updatepropertylist = function(){
             return propertyService.getUnscheduledProperties()
                .then(setProperties)
                .then(setPropertyDistances)
        };

		vm.propertyselected = function(index) {
            vm.showList = false;
            vm.selectedProperty = vm.unscheduledProperties[index];
            vm.selectedIndex = index;
        };

        vm.tolist = function() {
            vm.showList = true;
            vm.selectedProperty = null;
            vm.selectedIndex = null;
        };

        var setProperties = function(properties){
            vm.unscheduledProperties = properties;
        };

        var setPropertyDistances = function(){
            locationService.updatePropertyDistances(vm.unscheduledProperties).then(
                function(properties){
                    vm.unscheduledProperties = properties;
                }
            );
        };


	}]
});