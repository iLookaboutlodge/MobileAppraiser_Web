angular.module('auth', [])
    .factory('authService',['$rootScope', '$cookieStore',
        function ($rootScope, $cookieStore) {
            var factory = {};

            factory.SetCredentials = function (username, password) {
                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: ''
                    }
                };
                    $cookieStore.put('globals', $rootScope.globals);
            };

            factory.clearCredentials = function() {
                $rootScope.globals = {};
                $cookieStore.remove('globals');

            };

            factory.IsLoggedIn = function() {
                return $rootScope.globals && $rootScope.globals.currentUser;
            };

            return factory;
        }]
    );