var propertyComponent = angular.module('components');
propertyComponent.component('selectbuilding',
{
	templateUrl: 'Property/Tabs/selectBuilding.html',
	controller: ['$state', '$stateParams', '$scope', 'sketchService', function ($state, $stateParams, $scope, sketchService) {

	    var vm = this;
        
        vm.goToBuilding = function(buildingId) {
            $state.go("editproperty.buildingtab.sketch", {buildingid: buildingId});
        }

        function init () {
            vm.propertyid = $stateParams.id;

            sketchService.getSketchesForProperty(vm.propertyid).then(function(result){
                if(result.length == 1){
                    $state.go("editproperty.buildingtab.sketch", {buildingid: result[0].buildingId});
                }

                vm.buildings = result;
            });
        }
         
        init();
	}]
});