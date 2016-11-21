var mapComponent = angular.module('components');

mapComponent.component('map',
{
    templateUrl: './scripts/components/Map/map.html',
    bindings: {
        'properties': '=',
        'filter': '='
    },
    controller: ['$scope', '$state', '$window', '$q', '$filter', function ($scope, $state, $window, $q, $filter) {
        var vm = this;
        $scope.map = { zoom: 8, bounds:{southwest:{}, northeast:{}}};
        vm.currentPositionMarker = {};
        vm.filteredProperties = vm.properties;
        vm.markerControl = {};

        navigator.geolocation.getCurrentPosition(function(position){
            vm.currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        });

        var updateLabels = function(){
            for(var i = 0; i < vm.filteredProperties.length; i++){
                var newMarker = {
                    label: {
                        text: (i + 1).toString()
                    }
                };
                vm.filteredProperties[i].markerOptions = newMarker;
                //var marker = ;//.getChildMarkers().get(vm.filteredProperties[i]);
            }
        };


        var setLabels = function(){
            console.log('changing labels');
            for(var i = 0; i < vm.filteredProperties.length; i++){
                console.log(i + 1);
                vm.filteredProperties[i].markerOptions = {
                    label: {
                        text: (i + 1).toString()
                    }
                };
            }
        };

        var applyFilter = function() {
            vm.filteredProperties = $filter('filter')(vm.properties, vm.filter, true);
            setLabels();
            updateLabels();
        };

        var getBounds = function(){
            var bound = new google.maps.LatLngBounds();

            for (var i = 0; i < vm.filteredProperties.length; i++) {
                bound.extend(new google.maps.LatLng(vm.filteredProperties[i].Location.Latitude, vm.properties[i].Location.Longitude));
            }

            return bound;
        }

        var setBounds = function() {
            var bounds = getBounds();
            var northEast = bounds.getNorthEast();
            var southWest = bounds.getSouthWest();

            $scope.map.bounds.northeast = {
                latitude: northEast.lat(),
                longitude: northEast.lng()
            };

            $scope.map.bounds.southwest = {
                latitude: southWest.lat(),
                longitude: southWest.lng()
            }
            console.log('bounds: ', $scope.map.bounds);
        };

        var getCurrentLocationMarker = function() {
            if(navigator.geolocation){

                navigator.geolocation.getCurrentPosition(function(position){
                    console.log(position);

                    vm.currentPositionMarker.coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                    vm.currentPositionMarker.markerOptions = {
                        icon: {
                            url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2A7665"
                        }
                    };
                    console.log(vm.currentPositionMarker);
                });
            }
        }

        var setMap = function(){
            $scope.map.center = getCenter();
            console.log('center: ', $scope.map.center);
        };

        $scope.$on('propertiesChanged', function(){
            console.log('properties changed');
            applyFilter();  
            setBounds();
            var markers = vm.markerControl.getGMarkers();
            for(var i =0; i < markers.length; i++){
                console.log('changing marker Options');
                var newMarker = markers[i];
                newMarker.model.markerOptions = 
                {
                    label: {
                        text: (i + 1).toString()
                    }
                };

                markers[i] = newMarker;
            }
            console.log(vm.markerControl.getGMarkers());
            if(!vm.filteredProperties){
                return;
            }
        });

        var init = function(){
            applyFilter();
            setBounds();

            getCurrentLocationMarker();
        };

        init();

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

        // $scope.$on("propertiesChanged", function(event, options){
        //         console.log('properties changed');
        //         if(!vm.map) {
        //              vm.map = new google.maps.Map(document.getElementById('map'));
        //         }

        //         if(vm.properties) {
        //             console.log('here2');
        //             vm.map.setOptions(mapOptions());
        //             //removeMarkersNotValid();
        //             //addMarkers();

        //             console.log(vm.markers);
        //             //vm.map = new google.maps.Map(document.getElementById('map'), mapOptions(vm.properties));
                    
        //             // for (var i = 0; i < vm.properties.length; i++) {
        //             //     vm.markers.push(createMarker(vm.properties[i]));
        //             // }
        //         }
        //        //animateMarker(vm.property.Pin);
        // });

        return this;
    }]
});