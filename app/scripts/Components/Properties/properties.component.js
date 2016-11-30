var propertiesComponent = angular.module('components');

propertiesComponent.component('properties', {
    templateUrl: 'Properties/properties.html',
    controller: ['$rootScope', '$scope', '$state', '$filter', '$q', 'propertyService', function($rootScope, $scope, $state, $filter, $q, propertyService) {
        var vm = this;

        $rootScope.$watch('updating', function(){
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            vm.title = $rootScope.pagetitle;
        });

        vm.goToUnscheduled = function(){
            $state.go("properties.unscheduled");
        };

        vm.goToScheduled = function() {
            $state.go("properties.scheduled");
        };

        vm.goToComplete = function() {
            $state.go("properties.complete");
        };

        vm.$onInit = function () {
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
            vm.title = $rootScope.pagetitle;
        }; 
    }]
});