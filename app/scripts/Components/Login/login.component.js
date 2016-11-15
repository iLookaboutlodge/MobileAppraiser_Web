var loginComponent = angular.module('components');
loginComponent.component('login',
{
    templateUrl: 'Login/login.html',
    controller: ['authService', '$state', function(authService, $state) {
        var vm = this;

        authUtility.clearCredentials();

        vm.login = function() {
            authUtility.SetCredentials('simon', 'password');
            $state.go('properties');
        };
    }]
});