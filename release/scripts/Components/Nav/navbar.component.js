var navbarComponent = angular.module('navbarModule', ['auth', 'property', 'update']);

navbarComponent.component('navbar',
{
    templateUrl: 'Nav/navbar.html',
    controller: ['$scope', '$rootScope', 'authService', '$state', 'propertyService','updateService', function ($scope, $rootScope, authService, $state, propertyService, updateService) {
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
            return authService.IsLoggedIn();
        }

        vm.logOut = function () {
            authService.clearCredentials();
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