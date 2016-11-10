var buildingExtraFeaturesComponent = angular.module('buildingExtraFeaturesModule', ['property']);
buildingExtraFeaturesComponent.component('buildingextrafeatures',
{
	templateUrl: 'Property/Tabs/building/extraFeatures.html',
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
	    	vm.building.BuildingExtraFeatures.splice(vm.selectedIndex, 1);
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