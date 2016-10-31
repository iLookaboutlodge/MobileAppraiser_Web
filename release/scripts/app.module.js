var app = angular.module('app',
    [
        "ui.router",
        'ngCookies',
        "auth",
        "property",
        "loginModule",
        "navbarModule",
        "propertiesModule",
        "aboutModule",
        "propertyModule",
        "editPropertyModule",
        "mapModule",
        "sketchModule",
        "drawModule",
        "config",
        "property",
        "propertyApi",
        "propertyIndexDB",
        "imageIndexDB",
        "indexDB",
        "update",
        "ngFileUpload",
        "ngTouch"
    ])
    .run([
        "$window", "$rootScope", "$location", "$cookieStore", "indexDBService", "updateService", function($window, $rootScope, $location, $cookieStore, indexDBService, updateService) {
            
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
            

            // indexDBService.open().then(function(){
            //     propertyService.updatePropertyList();
            // });

            $rootScope.globals = $cookieStore.get('globals') || {};
            if (!$rootScope.globals || !$rootScope.globals.currentUser) {
                if ($location.path() !== "/login") {
                    $location.path("/login");
                }
            }
        }
    ]);

