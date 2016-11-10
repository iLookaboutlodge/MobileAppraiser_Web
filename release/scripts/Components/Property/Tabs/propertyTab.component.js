var propertyTabComponent = angular.module('propertyTabModule', []);
propertyTabComponent.component('propertytab',
{
	templateUrl: 'Property/Tabs/propertyTab.html',
	controller: ['$stateParams', '$state', function ($stateParams, $state) {

	    var vm = this;
        vm.selectedTab = 'details';

        vm.goToDetails = function(){
            vm.selectedTab = 'details';
            $state.go("editproperty.propertytab.details");
        };

        vm.goToImages = function(){
        	vm.selectedTab = 'images';
        	$state.go("editproperty.propertytab.images");
        };

        vm.goToNotes = function(){
            vm.selectedTab = 'notes';
            $state.go("editproperty.propertytab.notes");
        };

        vm.goToPermits = function() {
            vm.selectedTab = 'permits';
            $state.go("editproperty.propertytab.permits");
        };

        vm.goToSale = function(){
            vm.selectedTab = 'sales';
            $state.go("editproperty.propertytab.sales");
        };

        vm.goToLand = function(){
            vm.selectedTab = 'land';
            $state.go("editproperty.propertytab.land");
        };

        vm.goToInspection = function(){
            vm.selectedTab = 'inspection';
            $state.go("editproperty.propertytab.inspections");
        }; 
	}]
});