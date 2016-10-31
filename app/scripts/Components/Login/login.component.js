var loginComponent = angular.module('loginModule',['auth']);
loginComponent.component('login',
{
    templateUrl: 'Login/login.html',
    controller: ['authService', '$state', function(authService, $state) {
        var vm = this;

        authService.clearCredentials();

        vm.login = function() {
            authService.SetCredentials('simon', 'password');
            $state.go('properties');
        };
    }]
});