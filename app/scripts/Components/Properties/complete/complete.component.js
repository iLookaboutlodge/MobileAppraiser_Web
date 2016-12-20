var components = angular.module('components');

components.component('complete',
{
	bindings: {
		'properties': '<'
	},
	templateUrl: 'Properties/complete.html',
	controller: ['propertyService', function(propertyService){
		var vm = this;

		vm.filteredProperties = [];

		vm.$onChanges = function(changes) {
			getCompleteProperties();
		};

		var getCompleteProperties = function(property){
           return propertyService.getCompleteProperties().then(
			   function(properties){
				   vm.completeProperties = properties;
				}
		   )
        };
	}]
});