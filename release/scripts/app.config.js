angular.module('app').config(['$stateProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;    
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Origin'];

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    var login = {
        name: 'login',
        url: '/login',
        template: '<login></login>',
        data: {
            pageTitle: 'Login'
        }
    };

    var properties = {
        name: 'properties',
        url: '/properties',
        template: '<properties></properties>',
        data: {
            pageTitle: 'Properties'
        }
    };

    var editProperty = {
        name: 'editproperty',
        url: '/property/{id}/edit',
        template: '<editproperty></editproperty>',
        params: {
            id: null
        }
    };

    var property = {
        name: 'property',
        url: '/property/{id}',
        template: '<property></property>',
        params: {
            id: null
        }
    };

    var about = {
        name: 'about',
        url: '/about',
        template: '<about></about>'
    };

    var home = {
        name: 'default',
        url: '/',
        template: '<properties></properties>'
    };

    var main = {
        name: 'options',
        url: '/options',
        template: '<main></main>'
    };

    var map = {
        name: 'map',
        url: '/map',
        template: '<map></map>'
    };

    var sketch = {
        name: 'sketch',
        url: '/sketch/{id}',
        template: '<sketch></sketch>',
        params: {
            id: null
        }
    };

    $stateProvider.state(home);
    $stateProvider.state(login);
    $stateProvider.state(properties);
    $stateProvider.state(editProperty);
    $stateProvider.state(property);
    $stateProvider.state(about);
    $stateProvider.state(main);
    $stateProvider.state(map);
    $stateProvider.state(sketch);
}]);
