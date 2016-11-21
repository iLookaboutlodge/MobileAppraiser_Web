var propertyNotesComponent = angular.module('components');
propertyNotesComponent.component('propertynotes',
{
	templateUrl: 'Property/Tabs/property/notes.html',
	controller: ['$stateParams', '$scope', '$rootScope', 'propertyService','dateUtility', function ($stateParams, $scope, $rootScope, propertyService, dateUtility) {
	    
	    var vm = this;
		vm.propertyId = $stateParams.id;
	    vm.showPopup = false;

    	vm.saveNote = function(){
    		vm.property.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: vm.newNote});
    		propertyService.update(vm.property);
    		vm.newNote = '';
    		vm.showPopup = false;
    	};

    	vm.remove = function(item){
    		vm.property.Notes.splice(vm.property.Notes.indexOf(item), 1);
    		propertyService.update(vm.property);
    	};

		var init = function(){
			propertyService.get(vm.propertyId)
	        .then(
	        	function (result) {
	            	vm.property = result;
	        	}
	    	);
    	};

    	$rootScope.$watch('noteAdded', function(){
            //should show loading screen here
            init();
        });

        init();

        return vm;
	}]
});