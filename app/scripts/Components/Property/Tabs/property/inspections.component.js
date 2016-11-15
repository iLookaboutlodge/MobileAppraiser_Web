var propertyInspectionsComponent = angular.module('components');
propertyInspectionsComponent.component('propertyinspections',
{
	templateUrl: 'Property/Tabs/property/inspections.html',
	controller: ['$stateParams', '$scope', 'propertyService', 'dateUtility', function ($stateParams, $scope, propertyService, dateUtility) {

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