var propertySalesComponent = angular.module('propertySalesModule', ['property']);
propertySalesComponent.component('propertysales',
{
	templateUrl: 'Property/Tabs/property/sales.html',
	controller: ['$stateParams', '$scope', 'propertyService', function ($stateParams, $scope, propertyService) {
	    var vm = this;
	    vm.propertyId = $stateParams.id;

		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];

		vm.getDate = function(date) {
    		var dateObj = new Date(date);
    		return dateObj.getDate() + '-' + monthNames[dateObj.getMonth()] + '-' + dateObj.getFullYear();
    	};

     	propertyService.get(vm.propertyId)
        .then(
        	function (result) {
            	vm.property = result;
        	}
    	);
	}]
});