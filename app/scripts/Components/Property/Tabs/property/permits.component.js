var propertyPermitsComponent = angular.module('components');
propertyPermitsComponent.component('propertypermits',
{
	templateUrl: 'Property/Tabs/property/permits.html',
	controller: ['$stateParams', '$scope', 'propertyService', 'dateUtility', function ($stateParams, $scope, propertyService, dateUtility) {

	    var vm = this;
	    vm.propertyId = $stateParams.id;

		vm.getDate = function(date) {
    		dateUtility.getDate(date);
    	};

     	propertyService.get(vm.propertyId)
        .then(
        	function (result) {
            	vm.property = result;
        	}
    	);
        
	}]
});