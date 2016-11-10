var propertyComponent = angular.module('buildingSketchModule', ['property']);
propertyComponent.component('buildingsketch',
{
	templateUrl: 'Property/Tabs/sketch.html',
	controller: ['$stateParams','$window', 'propertyService', function ($stateParams, $window, propertyService) {

	    var vm = this;
        
        vm.propertyid = $stateParams.id;
        vm.buildingid = $stateParams.buildingid;

        vm.imageHeight = $window.innerHeight * 0.6;

        function init () {
            propertyService.getBuildingSketch(vm.propertyid, vm.buildingid)
            .then(
                function(image){
                    vm.sketch = image;
                }
            );
        }
         
        init();
	}]
});