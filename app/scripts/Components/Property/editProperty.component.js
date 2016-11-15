var propertyComponent = angular.module('components');
propertyComponent.component('editproperty',
{
	templateUrl: 'Property/editProperty.html',
	controller: ['$state', '$stateParams', '$scope', '$rootScope', 'propertyService', function ($state, $stateParams, $scope, $rootScope, propertyService) {

		var vm = this;

		var setTab = function(tab){
	    	vm.selectedTab = tab;
	    };

	    vm.goToBuildingTab = function() {
	    	setTab("building");
	    	$state.go("editproperty.selectbuilding");
	    };

	    vm.goToPropertyTab = function(){
	    	setTab("property");
	    	$state.go("editproperty.propertytab.details");
	    };

	    vm.goToProperty = function(){
	    	$state.go("property", {id: vm.propertyId});
	    };

	    var dataURIBufferArray = function (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
	        var byteString;
	        if (dataURI.split(',')[0].indexOf('base64') >= 0)
	            byteString = atob(dataURI.split(',')[1]);
	        else
	            byteString = unescape(dataURI.split(',')[1]);

	        // separate out the mime component
	        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	        // write the bytes of the string to a typed array
	        var ia = new Uint8Array(byteString.length);
	        for (var i = 0; i < byteString.length; i++) {
	            ia[i] = byteString.charCodeAt(i);
	        }

	        return ia;
    	};

	    vm.upload = function(file){
	    	var reader = new FileReader();

			reader.onload = function(){
				var buffer = dataURIBufferArray(reader.result);
				propertyService.addImage(vm.propertyId, buffer).then(
		    		function(newImage){
		    			$rootScope.imageUploaded = new Date();
		    		}
	    		);
			}

	    	reader.readAsDataURL(file);

	    	// console.log(file);
	    	// propertyService.addImage(vm.propertyId, file).then(
	    	// 	function(newImage){
	    	// 		$rootScope.imageUploaded = new Date();
	    	// 	}
    		// );
	    };

	    vm.goToNextBuilding = function(){
	    	propertyService.getNextBuilding(vm.property, vm.buildingId).then(function(nextBuilding){
	    		$state.go('editproperty.buildingtab.sketch', {buildingid: nextBuilding.Id});
	    	});
	    };

	    vm.goToPreviousBuilding = function(){
	    	propertyService.getPreviousBuilding(vm.property, vm.buildingId).then(function(previousBuilding){
	    		$state.go('editproperty.buildingtab.sketch', {buildingid: previousBuilding.Id});
	    	});
	    };

	    vm.saveNote = function(){
	    	if(vm.buildingId != null && vm.buildingId != undefined){
	    		propertyService.getBuilding(vm.propertyId, vm.buildingId).then(
	    			function(building){
	    				building.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: vm.newNote});
    					propertyService.updateBuilding(vm.propertyId, building).then(function(){
    						vm.newNote = '';
	    					vm.showPopup = false;
	    					$rootScope.noteAdded = new Date();
    					});
	    			});
	    	}
	    	else {
	    		propertyService.get(vm.propertyId).then(function(property){
	    			property.Notes.push({User: 'Joe Bloggs', Date: new Date(), Note: vm.newNote});
	    				propertyService.update(property).then(function(){
	    				vm.newNote = '';
	    				vm.showPopup = false;
	    				$rootScope.noteAdded = new Date();
	    			});
	    		});
	    	}
	    };

	    var init = function() {
	    	vm.propertyId = $stateParams.id;
	    	vm.buildingId = $stateParams.buildingid;
	    	setTab("building");

	    	$scope.$on('$stateChangeSuccess', function(){
	    		vm.buildingId = $stateParams.buildingid;
	    	});
	    	
	    	propertyService.get(vm.propertyId)
            .then(
            	function (result) {
                	vm.property = result;
            	}
        	);
	    };

	    init();
	}]
});