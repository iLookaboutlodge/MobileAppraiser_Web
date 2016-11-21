var propertyLandComponent = angular.module('components');
propertyLandComponent.component('propertyland',
{
	templateUrl: 'Property/Tabs/property/land.html',
	controller: ['$stateParams', '$scope', 'propertyService', function ($stateParams, $scope, propertyService) {
	    var vm = this;
	    vm.propertyId = $stateParams.id;
	    vm.selectedIndex = null;

	    vm.selectRow = function(index){
	    	vm.selectedIndex = index;
	    };

	    vm.editRow = function() {
	    	console.log('editRow');
	    };

	    vm.removeRow = function() {
	    	vm.property.LandDescriptions.splice(vm.selectedIndex, 1);
	    };

	     propertyService.get(vm.propertyId)
            .then(
            	function (result) {
                	vm.property = result;
            	}
        	);
	}]
});