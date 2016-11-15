var propertySalesComponent = angular.module('components');
propertySalesComponent.component('propertysales',
{
	templateUrl: 'Property/Tabs/property/sales.html',
	controller: ['$stateParams', '$scope', 'propertyService','dateUtility', function ($stateParams, $scope, propertyService, dateUtility) {
	    var vm = this;
	    vm.propertyId = $stateParams.id;

		vm.getDate = function(date) {
    		return dateUtility.getDate(date);
    	};

     	propertyService.get(vm.propertyId)
        .then(
        	function (result) {
            	vm.property = result;
        	}
    	);
	}]
});