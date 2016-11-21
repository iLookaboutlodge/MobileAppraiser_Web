var propertyDetailsComponent = angular.module('components');
propertyDetailsComponent.component('propertydetails',
{
	templateUrl: 'Property/Tabs/property/details.html',
	controller: ['$stateParams', '$scope', 'propertyService', function ($stateParams, $scope, propertyService) {

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