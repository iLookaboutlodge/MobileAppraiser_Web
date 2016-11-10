var propertyComponent = angular.module('buildingSketchModule', ['property']);
propertyComponent.component('buildingsketch',
{
	templateUrl: 'Property/Tabs/building/sketch.html',
	controller: ['$stateParams','$window', 'propertyService', function ($stateParams, $window, propertyService) {

	    var vm = this;
        
        function init () {
            vm.propertyid = $stateParams.id;
            vm.buildingid = $stateParams.buildingid;
            vm.imageHeight = $window.innerHeight * 0.6;

            propertyService.getBuilding(vm.propertyid, vm.buildingid)
            .then(
                function(building){
                    vm.building = building;
                }
            );

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