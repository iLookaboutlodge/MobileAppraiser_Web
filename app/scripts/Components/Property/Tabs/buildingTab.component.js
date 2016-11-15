var buildingTabComponent = angular.module('components');
buildingTabComponent.component('buildingtab',
{
	templateUrl: 'Property/Tabs/buildingTab.html',
	controller: ['$stateParams', '$state', 'propertyService', function ($stateParams, $state, propertyService) {

	    var vm = this;
        vm.selectedTab = 'sketch';

        vm.goToSketch = function(){
            vm.selectedTab = 'sketch';
            $state.go("editproperty.buildingtab.sketch");
        };

        vm.goToDetails = function(){
        	vm.selectedTab = 'details';
        	$state.go("editproperty.buildingtab.details");
        };

        vm.goToCharacteristics = function(){
        	vm.selectedTab = 'characteristics';
        	$state.go("editproperty.buildingtab.characteristics");
        };

        vm.goToInterior = function(){
        	vm.selectedTab = 'interior';
        	$state.go("editproperty.buildingtab.interior");
        };

        vm.goToDepreciation = function(){
        	vm.selectedTab = 'depreciation';
        	$state.go("editproperty.buildingtab.depreciation");
        };

        vm.goToAreas = function(){
        	vm.selectedTab = 'areas';
        	$state.go("editproperty.buildingtab.areas");
        };

        vm.goToExtraFeatures = function(){
        	vm.selectedTab = 'extraFeatures';
        	$state.go("editproperty.buildingtab.extrafeatures");
        };

        vm.goToNotes = function(){
        	vm.selectedTab = 'notes';
        	$state.go("editproperty.buildingtab.notes");
        };
	}]
});