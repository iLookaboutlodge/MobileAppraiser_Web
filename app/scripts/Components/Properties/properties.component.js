var propertiesComponent = angular.module('components');

propertiesComponent.component('properties', {
    templateUrl: 'Properties/properties.html',
    controller: ['$rootScope', '$scope', '$state', '$filter', 'propertyService', function($rootScope, $scope, $state, $filter, propertyService) {
        var vm = this;

        $rootScope.$watch('updating', function(){
            //should show loading screen here
            init();
        });

        vm.showMap = false;

        vm.filter = {
            WorkStatus: 'unscheduled'
        };

        vm.properties = [];
        
        vm.goToProperty = function (propertyId) {
            $state.go("property", {id: propertyId});
        };

        vm.scheduleProperty = function(property) {
            property.WorkStatus = 'scheduled';
            propertyService.update(property);
        };

        vm.unscheduleProperty = function(property) {
            property.WorkStatus = 'unscheduled';
            propertyService.update(property);
        };

        vm.applyFilter = function(){
            $scope.$broadcast("propertiesChanged", {newValue: vm.filteredProperties});
        };

        var init = function () {
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
            vm.applyFilter();
        };

        init();
    }]
});