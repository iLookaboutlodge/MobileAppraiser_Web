var propertyComponent = angular.module('propertyModule', ['property', 'ngFileUpload']);
propertyComponent.component('property',
{
	templateUrl: 'Property/property.html',
	controller: ['$window','$stateParams', '$scope', '$state', 'propertyService', 'Upload', function ($window, $stateParams, $scope, $state, propertyService, Upload) {

	    var vm = this;

	    vm.propertyId = $stateParams.id;

	    vm.goToEditProperty = function() {
	        $state.go("editproperty", { id: vm.propertyId });
	    }

	    vm.setPropertyToComplete = function() {
	    	vm.newProperty.Completed = "true";
	    	propertyService.update(vm.newProperty);
	    }

	    vm.upload = function(file){
	    	console.log('file', file);
	    	propertyService.addImage(vm.propertyId, file).then(
	    		function(){
	    			getAndSetImages();
	    		}
    		);
	    }

	    var getAndSetImages = function(){
	    	propertyService.getImagesForProperty(vm.propertyId).then(function(imageUrls){
        		vm.imageUrls = imageUrls;
        	});
	    }

        function init () {

        	getAndSetImages();

            return propertyService.get(vm.propertyId)
                .then(function (result) {
                    vm.newProperty = result;
                });
        }
         
        init();
	}]
});