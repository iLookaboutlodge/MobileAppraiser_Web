var propertyImagesComponent = angular.module('propertyImagesModule', ['property']);
propertyImagesComponent.component('propertyimages',
{
	templateUrl: 'Property/Tabs/property/images.html',
	controller: ['$stateParams', '$scope', '$rootScope', '$q', 'propertyService', function ($stateParams, $scope, $rootScope, $q, propertyService) {

	    var vm = this;
	    vm.currentImageIndex = 0;

	    var getPreviousIndex = function(list, currentIndex) {
    	var newIndex = currentIndex;

			if (list.length > 1){
	    		if (newIndex == 0){
	    			newIndex = list.length - 1;
	    		}
	    		else {
	    			newIndex = newIndex - 1;
	    		}
	    	}
	    	return newIndex;
	    };

	    var getNextIndex = function(list, currentIndex){
	    	var newIndex = currentIndex;

			if(list.length > 1){
	    		if(newIndex == (list.length - 1)){
	    			newIndex = 0;
	    		}
	    		else {
	    			newIndex++;
	    		}
	    	}

	    	return newIndex;
	    };

	    var getImages = function(){
	    	var deferred = $q.defer();

	    	propertyService.getImagesForProperty(vm.propertyId).then(function(imageUrls){
        		vm.imageUrls = imageUrls.sort(function(a,b){a.date-b.date});
        		setImage();
        		deferred.resolve();
        	});

        	return deferred.promise;
	    };

	    var setImage = function(index) {
	    	vm.currentImageIndex = index;
	    	vm.selectedImage = vm.imageUrls[vm.currentImageIndex];
	    };

    	vm.nextImage = function(){
	    	setImage(getNextIndex(vm.imageUrls, vm.currentImageIndex));
	    };

	    vm.previousImage =function(){
	    	setImage(getPreviousIndex(vm.imageUrls, vm.currentImageIndex));
	    };

	    $rootScope.$watch('imageUploaded', function(){
            getImages().then(function(){
            	setImage(vm.imageUrls.length - 1);
            });
        });

	    var init = function(){
	    	vm.propertyId = $stateParams.id;
	    	getImages();
	    };

	    init();
	}]
});