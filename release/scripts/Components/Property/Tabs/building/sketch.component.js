var propertyComponent = angular.module('components');
propertyComponent.component('buildingsketch',
{
	templateUrl: 'Property/Tabs/building/sketch.html',
	controller: ['$stateParams','$window', 'sketchService', 'propertyService', function ($stateParams, $window, sketchService, propertyService) {

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

            sketchService.getBuildingSketch(vm.propertyid, vm.buildingid)
            .then(
                function(image){
                    vm.sketch = image;
                }
            );
        };
         
        init();
	}]
});