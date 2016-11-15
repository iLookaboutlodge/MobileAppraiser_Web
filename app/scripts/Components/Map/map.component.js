var mapComponent = angular.module('components');

mapComponent.component('map',
{
    templateUrl: './scripts/components/Map/map.html',
    controller: ['propertyService', '$state', '$window', '$q', function (propertyService, $state, $window, $q) {
        var vm = this;
        
        var mapOptions = function(properties) {
            var bound = new google.maps.LatLngBounds();

            for (var i = 0; i < properties.length; i++) {
                bound.extend(new google.maps.LatLng(properties[i].Latitude, properties[i].Longitude));
            }

            return {
                zoom: 15,
                center: bound.getCenter(),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
        }

        var animateMarker = function (pin) {
            for (var i = 0; i < vm.markers.length; i++) {
                if (vm.markers[i].propertyId == pin) {
                    vm.markers[i].setAnimation(google.maps.Animation.BOUNCE);
                } else {
                    vm.markers[i].setAnimation(null);
                }
            }
        }

        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map: vm.map,
                position: new google.maps.LatLng(info.Latitude, info.Longitude),
                title: info.FullAddress,
                propertyId: info.Pin
            });

            marker.addListener('click',
                function() {
                    propertyService.setCurrentProperty(info.Pin).then(function(property) {
                        vm.property = property;
                        animateMarker(property.Pin);
                    });
                });

            return marker;
        }    

        vm.next = function () {
            propertyService.getNextProperty(vm.property.Pin).then(function (property) {
                vm.property = property;
                animateMarker(property.Pin);
            });
        }

        vm.previous = function () {
            propertyService.getPreviousProperty(vm.property.Pin).then(function (property) {
                vm.property = property;
                animateMarker(property.Pin);
            });
        }

        var init = function () {

            $q.all([propertyService.getAllProperties(), propertyService.getCurrentSelectedProperty()])
                .then(function (result) {
                    vm.properties = result[0];
                    vm.property = result[1];

                    vm.map = new google.maps.Map(document.getElementById('map'), mapOptions(vm.properties));

                    vm.markers = [];
                    for (var i = 0; i < vm.properties.length; i++) {
                        vm.markers.push(createMarker(vm.properties[i]));
                    }

                    animateMarker(vm.property.Pin);
                });
        }

        init();
    }]
});