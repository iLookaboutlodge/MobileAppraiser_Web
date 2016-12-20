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
            vm.loading = true;
             return propertyService.getUnscheduledProperties()
                .then(setPropertyDistances);
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

        var setPropertyDistances = function(properties){
            return locationService.updatePropertyDistances(properties).then(
                function(orderedproperties){
                    vm.unscheduledProperties = orderedproperties;
                    vm.loading = false;
                },
                function(){
                    vm.loading = false;
                }
            );
        };
	}]
});