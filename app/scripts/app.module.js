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
        "$window", "$rootScope", "$location", "$cookieStore", "updateService", function($window, $rootScope, $location, $cookieStore, updateService) {
            
            $rootScope.online = navigator.onLine;

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
        }
    ]);

