var buildingDepreciationComponent = angular.module('components');
buildingDepreciationComponent.component('buildingdepreciation',
{
	templateUrl: 'Property/Tabs/building/depreciation.html',
	controller: ['$stateParams', '$state', 'propertyService', function ($stateParams, $state, propertyService) {

	    var vm = this;
	    vm.propertyId = $stateParams.id;
	    vm.buildingId = $stateParams.buildingid;
	    vm.selectedIndex = null;

	    vm.selectRow = function(index){
	    	vm.selectedIndex = index;
	    };

	    vm.editRow = function() {
	    	console.log('editRow');
	    };

	    vm.removeRow = function() {
	    	vm.building.BuildingDepreciation.splice(vm.selectedIndex, 1);
	    	vm.selectedIndex = null;
	    };

	     propertyService.getBuilding(vm.propertyId, vm.buildingId)
            .then(
            	function (result) {
                	vm.building = result;
            	}
        	);
	}]
});