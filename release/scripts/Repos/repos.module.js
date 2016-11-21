var app = angular.module('repos', ['utilities', 'config']).config(['$httpProvider', function ($httpProvider) {    
        $httpProvider.defaults.useXDomain = true;    
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['Origin'];
    }]);