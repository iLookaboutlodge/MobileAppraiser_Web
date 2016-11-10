﻿var propertyComponent = angular.module('propertyModule', ['property', 'ngFileUpload']);
propertyComponent.component('property',
{
	templateUrl: 'Property/property.html',
	controller: ['$window','$stateParams', '$scope', '$state', '$rootScope', '$window', 'propertyService', 'Upload', function ($window, $stateParams, $scope, $state, $rootScope, $window, propertyService, Upload) {

	    var vm = this;
	    vm.currentImageIndex = 0;

	    var setImage = function(index) {
	    	vm.currentImageIndex = index;
	    	vm.selectedImage = vm.imageUrls[vm.currentImageIndex];
	    };

	    var getPreviousIndex = function(list, currentIndex) {
	    	var newIndex = currentIndex;

			if (list && list.length > 1){
	    		if (newIndex == 0){
	    			newIndex = list.length - 1;
	    		}
	    		else {
	    			newIndex = newIndex - 1;
	    		}
	    	}
	    	return newIndex;
	    }

	    var getNextIndex = function(list, currentIndex){
	    	var newIndex = currentIndex;

			if(list && list.length > 1){
	    		if(newIndex == (list.length - 1)){
	    			newIndex = 0;
	    		}
	    		else {
	    			newIndex++;
	    		}
	    	}

	    	return newIndex;
	    }

	    var getImages = function(){
	    	propertyService.getImagesForProperty(vm.propertyId).then(function(imageUrls){
        		vm.imageUrls = imageUrls.sort(function(a,b){a.date - b.date;});
        		setImage(0);
        	});
	    };

	    var getSketches  = function(){
	    	propertyService.getSketchesForProperty(vm.propertyId).then(
	    		function(sketches){
	    			vm.sketches = sketches;
	    			vm.selectedSketch = sketches[0];
    		});
	    };

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


	    vm.goToEditProperty = function() {
	        $state.go("editproperty.selectbuilding", {id: vm.propertyId});
	    }

	    vm.setPropertyToComplete = function() {
	    	vm.newProperty.Completed = "true";
	    	propertyService.update(vm.newProperty).then(
	    		function(){
	    			$state.go("properties");
    			});
	    	
	    }

	    vm.upload = function(file){
	    	propertyService.addImage(vm.propertyId, file).then(
	    		function(){
	    			getImages();
	    		}
    		);
	    };

	    vm.goToProperties = function(){
	    	$state.go("properties");
	    };

	    vm.nextSketch = function(){
	    	vm.currentSketchIndex = getNextIndex(vm.sketches, vm.currentSketchIndex);
	    	vm.selectedSketch = vm.sketches[vm.currentSketchIndex];
	    }

	    vm.previousSketch = function(){
	    	vm.currentSketchIndex = getPreviousIndex(vm.sketches, vm.currentSketchIndex);
	    	vm.selectedSketch = vm.sketches[vm.currentSketchIndex];
	    }

	    vm.nextImage = function(){
	    	setImage(getNextIndex(vm.imageUrls, vm.currentImageIndex));
	    }

	    vm.previousImage =function(){
	    	setImage(getPreviousIndex(vm.imageUrls, vm.currentImageIndex));
	    }
	    
        function init () {
        	vm.propertyId = $stateParams.id;
        	vm.selectedTab = 1;
			vm.currentSketchIndex = 0; 
	    	vm.imageHeight = $window.innerHeight * 0.6;

        	getImages();
			getSketches();

            propertyService.get(vm.propertyId)
            .then(
            	function (result) {
                	vm.newProperty = result;
            	}
        	);
        }

        $rootScope.$watch('updating', function(){
            init();
        });

         
        init();
	}]
});