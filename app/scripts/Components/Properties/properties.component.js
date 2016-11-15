var propertiesComponent = angular.module('components');

propertiesComponent.component('properties', {
    templateUrl: 'Properties/properties.html',
    controller: ['$rootScope', '$scope', '$state', 'propertyService', function($rootScope, $scope, $state, propertyService) {
        var vm = this;

        $rootScope.$watch('updating', function(){
            //should show loading screen here
            init();
        });

        vm.filter = {};
        vm.filter.Completed = '';

        vm.goToProperty = function (propertyId) {
            $state.go("property", {id: propertyId});
        };

        var init = function () {
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
        }

        init();
    }]
});