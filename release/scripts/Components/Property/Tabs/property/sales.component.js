var propertySalesComponent = angular.module('components');
propertySalesComponent.component('propertysales',
{
	templateUrl: 'Property/Tabs/property/sales.html',
	controller: ['$stateParams', '$scope', 'propertyService','dateUtility', function ($stateParams, $scope, propertyService, dateUtility) {
	    var vm = this;
	    vm.propertyId = $stateParams.id;

     	propertyService.get(vm.propertyId)
        .then(
        	function (result) {
            	vm.property = result;
        	}
    	);
	}]
});