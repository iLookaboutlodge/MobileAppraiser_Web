var buildingNotesComponent = angular.module('buildingNotesModule', ['property']);
buildingNotesComponent.component('buildingnotes',
{
	templateUrl: 'Property/Tabs/building/notes.html',
	controller: ['$stateParams', '$state', '$rootScope', 'propertyService', function ($stateParams, $state, $rootScope, propertyService) {

	    var vm = this;
		vm.propertyId = $stateParams.id;
	    vm.buildingId = $stateParams.buildingid;
	    vm.showPopup = false;

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

    	vm.saveNote = function(){
    		vm.building.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: vm.newNote});
    		propertyService.updateBuilding(vm.propertyId, vm.building);
    		vm.newNote = '';
    		vm.showPopup = false;
    	};

    	vm.remove = function(item){
    		vm.building.Notes.splice(vm.building.Notes.indexOf(item), 1);
    		propertyService.updateBuilding(vm.propertyId, vm.building);
    	};

    	var init = function(){
        	propertyService.getBuilding(vm.propertyId, vm.buildingId)
        	.then(
	        	function (result) {
	            	vm.building = result;
	        	}
    		);
        }

    	$rootScope.$watch('noteAdded', function(){
            //should show loading screen here
            console.log('noteAdded watch kicked off');
            init();
        });

		init();

		return vm;
	}]
});