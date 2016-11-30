var components = angular.module('components');

components.component('unscheduled',
{
	bindings: {
		'properties': '<'
	},
	templateUrl: 'Properties/unscheduled.html',
	controller: ['$filter', function($filter){
		var vm = this;

		vm.$onChanges = function(changes) {
			vm.filteredProperties = $filter('filter')(vm.properties, {WorkStatus: "unscheduled"}, true);
		};
	}]
});