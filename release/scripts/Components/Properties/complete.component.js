var components = angular.module('components');

components.component('complete',
{
	bindings: {
		'properties': '<'
	},
	templateUrl: 'Properties/complete.html',
	controller: ['$filter', function($filter){
		var vm = this;

		vm.filteredProperties = [];

		vm.$onChanges = function(changes) {
			vm.filteredProperties = $filter('filter')(vm.properties, {WorkStatus: "complete"}, true);
		};
	}]
});