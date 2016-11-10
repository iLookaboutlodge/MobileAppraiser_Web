var propertyInspectionsComponent = angular.module('propertyInspectionsModule', ['property']);
propertyInspectionsComponent.component('propertyinspections',
{
	templateUrl: 'Property/Tabs/property/inspections.html',
	controller: ['$stateParams', '$scope', 'propertyService', function ($stateParams, $scope, propertyService) {

		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];

       	var vm = this;
    	vm.propertyId = $stateParams.id;

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