var mapComponent = angular.module('components');

mapComponent.component('mapcomponent',
{
    templateUrl: './scripts/components/Map/map.html',
    bindings: {
        'properties': '=',
        'filter': '='
    },
    controller: ['$scope', '$state', '$window', '$q', '$filter','NgMap', function ($scope, $state, $window, $q, $filter, NgMap) {
        var vm = this;
        

        navigator.geolocation.getCurrentPosition(function(position){
            vm.currentLocation = position.coords;
            vm.currentCoords = [position.coords.latitude, position.coords.longitude]
        });

        NgMap.getMap().then(function(map){
            vm.filteredProperties = $filter('filter')(vm.properties, vm.filter, true);
            
            setBounds(map);
            setWaypoints();

            vm.origin = vm.currentCoords[0] + "," + vm.currentCoords[1];
            vm.destination = vm.currentCoords[0] + "," + vm.currentCoords[1];
        });

        vm.getRoute = function(){
            if(vm.startLoc && vm.startLoc != ""){
                vm.origin = vm.startLoc;
            }
            else {
                vm.origin = vm.currentCoords[0] + "," + vm.currentCoords[1];
            }

            if(vm.endLoc && vm.endLoc != ""){
                console.log(vm.endLoc);
                vm.destination = vm.endLoc;
            }
            else {
                vm.destination = vm.currentCoords[0] + "," + vm.currentCoords[1];
            }
        };

        var filterProperties = function(){
            vm.filteredProperties = $filter('filter')(vm.properties, vm.filter, true);
        };

        var setWaypoints = function(){
            $scope.wayPoints  = [];
            for(var i = 0; i < vm.filteredProperties.length; i++){
                var obj = { 
                        location: vm.filteredProperties[i].Address.Address
                    };
                $scope.wayPoints.push(obj);            
            }
        };

        var setBounds = function(map) {
            var bounds = getBounds();
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        };

        var getBounds = function(){
            var bound = new google.maps.LatLngBounds();

            for (var i = 0; i < vm.filteredProperties.length; i++) {
                bound.extend(new google.maps.LatLng(vm.filteredProperties[i].Location.Latitude, vm.properties[i].Location.Longitude));
            }

            bound.extend(new google.maps.LatLng(vm.currentLocation.latitude, vm.currentLocation.longitude));

            return bound;
        };

       
        $scope.$on('propertiesChanged', function(){
            filterProperties();
            setWaypoints();
        });

        var init = function() {
            $scope.wayPoints = [];
        };


        // init();

        // vm.markers = [];
        // vm.map;

        // var removeMarkersNotValid = function(){
        //     var markerList = vm.markers;
            
        //     for(var j = 0; j < markerList.length; j++){
        //         var foundMarker = false;
        //         for (var i = 0; i < vm.properties.length; i++){
        //             if(markerList[j].propertyId == vm.properties[i].Id){
        //                 foundMarker = true;
        //                 break;
        //             }
        //         }
        //         if(!foundMarker){
        //             console.log('remove marker:', markerList[j].propertyId);
        //             var index = vm.markers.indexOf(markerList[j]);
        //             vm.markers.splice(index, 1);
        //         }
        //     }
        // }

        // var addMarkers = function() {

        //     for (var i = 0; i < vm.properties.length; i++){
        //         var foundProperty = false;
        //         for(var j = 0; j < vm.markers.length; j++){
        //             if(vm.markers[j].propertyId == vm.properties[i].Id){
        //                 foundProperty = true;
        //                 break;
        //             }
        //         }

        //         if(!foundProperty) {
        //             vm.markers.push(createMarker(vm.properties[i]));
        //         }
        //     }
        // }
        
        // var mapOptions = function() {
        //     var bound = new google.maps.LatLngBounds();

        //     for (var i = 0; i < vm.properties.length; i++) {
        //         bound.extend(new google.maps.LatLng(vm.properties[i].Location.Latitude, vm.properties[i].Location.Longitude));
        //     }

        //     return {
        //         zoom: 12,
        //         center: bound.getCenter(),
        //         mapTypeId: google.maps.MapTypeId.TERRAIN
        //     };
        // }

        // var animateMarker = function (pin) {
        //     // for (var i = 0; i < vm.markers.length; i++) {
        //     //     if (vm.markers[i].propertyId == pin) {
        //     //         vm.markers[i].setAnimation(google.maps.Animation.BOUNCE);
        //     //     } else {
        //     //         vm.markers[i].setAnimation(null);
        //     //     }
        //     // }
        // }

        // var createMarker = function (info) {
        //     var marker = new google.maps.Marker({
        //         map: vm.map,
        //         position: new google.maps.LatLng(info.Location.Latitude, info.Location.Longitude),
        //         title: info.Address.Address,
        //         propertyId: info.Id
        //     });

            // marker.addListener('click',
            //     function() {
            //         // propertyService.setCurrentProperty(info.Pin).then(function(property) {
            //         //     vm.property = property;
            //         //     animateMarker(property.Pin);
            //         // });
            //     });

            // return marker;
        // }

        $scope.$on("propertiesChanged", function(event, options){
                console.log('properties changed');

                if(vm.properties) {
                    // console.log('here2');
                    // vm.map.setOptions(mapOptions());
                    // //removeMarkersNotValid();
                    // //addMarkers();

                    // console.log(vm.markers);
                    //vm.map = new google.maps.Map(document.getElementById('map'), mapOptions(vm.properties));
                    
                    // for (var i = 0; i < vm.properties.length; i++) {
                    //     vm.markers.push(createMarker(vm.properties[i]));
                    // }
                }
               //animateMarker(vm.property.Pin);
        });

        return this;
    }]
});