var buildingNotesComponent = angular.module('components');
buildingNotesComponent.component('buildingnotes',
{
	templateUrl: 'Property/Tabs/building/notes.html',
	controller: ['$stateParams', '$state', '$rootScope', 'propertyService','dateUtility', function ($stateParams, $state, $rootScope, propertyService, dateUtility) {

	    var vm = this;
		vm.propertyId = $stateParams.id;
	    vm.buildingId = $stateParams.buildingid;
	    vm.showPopup = false;

		vm.getDate = function(date) {
    		return dateUtility.getDate(date);
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
            init();
        });

		init();

		return vm;
	}]
});