var navbarComponent = angular.module('navbarModule', ['auth', 'property']);

navbarComponent.component('navbar',
{
    templateUrl: 'Nav/navbar.html',
    controller: ['$scope', '$rootScope', 'authService', '$state', 'propertyService', function ($scope, $rootScope, authService, $state, propertyService) {
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


        $rootScope.$watch('updating', function(){
            console.log('updating changed');
            console.log('updating in ctrl: ', $rootScope.updating);
            vm.updating = $rootScope.updating;
        });
        $rootScope.$watch('online', function(){
            console.log('online changed');
            vm.online = $rootScope.online;
        });
    }]
});