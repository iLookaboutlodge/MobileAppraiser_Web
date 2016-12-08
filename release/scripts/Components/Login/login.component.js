var loginComponent = angular.module('components');
loginComponent.component('login',
{
    templateUrl: 'Login/login.html',
    controller: ['authUtility', '$state', function(authUtility, $state) {
        var vm = this;

        authUtility.clearCredentials();

        vm.login = function() {
            authUtility.SetCredentials('simon', 'password');
            $state.go('properties.unscheduled');
        };
    }]
});