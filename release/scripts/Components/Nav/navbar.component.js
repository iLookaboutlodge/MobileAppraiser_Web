var navbarComponent = angular.module('components');

navbarComponent.component('navbar',
{
    templateUrl: 'Nav/navbar.html',
    controller: ['$scope', '$rootScope', 'authUtility', '$state', 'propertyService','updateService', function ($scope, $rootScope, authUtility, $state, propertyService, updateService) {
        var vm = this;

        vm.goToMap = function () {
            $state.go("map");
        }

        vm.goToProperties = function () {
            $state.go("properties");
        }

        vm.goToProperty = function () {
            $state.go("property");
        }

        vm.goToSketch = function () {
            $state.go("sketch");
        }

        vm.goToAbout = function () {
            $state.go("about");
        }

        vm.loggedIn = function() {
            return authUtility.IsLoggedIn();
        }

        vm.logOut = function () {
            authUtility.clearCredentials();
            $state.go("login");
        }

        vm.update = function(){
            if ($rootScope.online){
                updateService.update();
            }
        }


        $rootScope.$watch('updating', function(){
            vm.updating = $rootScope.updating;
        });
        $rootScope.$watch('online', function(){
            vm.online = $rootScope.online;
        });
    }]
});