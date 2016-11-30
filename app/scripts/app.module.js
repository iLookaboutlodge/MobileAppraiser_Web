var app = angular.module('app',
    [
        "ui.router",
        "components",
        "services",
        "repos",
        "utilities",
        "filters"
    ])
    .run([
        "$window", "$rootScope", "$location", "$cookieStore", "$state", "updateService", function($window, $rootScope, $location, $cookieStore, $state, updateService) {
            
            $rootScope.online = navigator.onLine;

            $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
                $rootScope.pagetitle = current.title;
            });

            updateService.update();

            $window.addEventListener("offline", function(){
                $rootScope.$apply(function(){
                    $rootScope.online = false;
                });
            }, false);

            $window.addEventListener("online", function(){
                $rootScope.$apply(function(){
                    $rootScope.online = true;
                    updateService.update();
                })
            }, false);

            $rootScope.globals = $cookieStore.get('globals') || {};
            if (!$rootScope.globals || !$rootScope.globals.currentUser) {
                if ($location.path() !== "/login") {
                    $location.path("/login");
                }
            }

            $rootScope.$on('$stateChangeStart', function(evt, to, params) {
              if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {location: 'replace'})
              }
            });
        }
    ]);

