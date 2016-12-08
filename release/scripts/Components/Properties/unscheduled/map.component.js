var components = angular.module('components');

components.component('unscheduledmap', {
    bindings: {
        'properties': '<',
        'distanceCallback': '&',
        'selectedpropertyindex': '<',
        'propertyselected': '&'
    },
    templateUrl: 'Properties/unscheduled/map.html',
    controller: ['$q','$rootScope', 'locationService', function($q, $rootScope, locationService) {
        var vm = this;
        vm.markers = [];
        var defaultZoom = 13;

        vm.$postLink = function() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: defaultZoom,
                center: {lat: -25.363, lng: 131.044}
            });
            
        };

        vm.$onChanges = function(changes) {

            if(changes.properties){
                setMarkersMap(vm.markers, null);
                vm.markers = [];

                createMarkers(vm.properties)
                    .then(function(markers){
                        vm.markers = markers;
                        var bounds = getBounds(markers);
                        vm.map.fitBounds(bounds);

                        if(vm.markers.length == 1){
                            vm.map.setZoom(defaultZoom);
                        }
                })
            }
            
            if(changes.selectedpropertyindex && vm.markers) {
                disableBounce(vm.markers);

                if(vm.selectedpropertyindex != null && vm.selectedpropertyindex >= 0){
                    google.maps.event.trigger(vm.markers[vm.selectedpropertyindex], 'click');
                    vm.map.setCenter(vm.markers[vm.selectedpropertyindex].getPosition());
                }
            }
        };

        vm.getLatLng = function(propertyLocation) {
            return new google.maps.LatLng(propertyLocation.Latitude, propertyLocation.Longitude);
        }

        var createMarkers = function(properties){
            var promises = [];

            for(var i = 0; i < properties.length; i++) {
                promises.push(createMarker(properties[i], i));
            }

            return $q.all(promises);
        };

        var setMarkersMap = function(markers, map) {
            for(var i =0; i < markers.length; i++) {
                markers[i].setMap(map);
                markers[i] = null;
            }
        }

        var createMarker = function(property, index) {
            var deferred = $q.defer();
            var latLng = new google.maps.LatLng(property.Location.Latitude, property.Location.Longitude);
            var marker = new google.maps.Marker({position: latLng});
            marker.addListener('click', function(){
                disableBounce(vm.markers);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                vm.propertyselected({index:index});
                if(!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });

            marker.setMap(vm.map);
            deferred.resolve(marker);
            return deferred.promise;
        };

        var disableBounce = function(markers) {
            for(var i = 0; i < markers.length; i++){
                markers[i].setAnimation(null);
            }
        };

        var getBounds = function(markers){
            var bounds = new google.maps.LatLngBounds();

            for(var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].position);
            }

            return bounds;
        };
    }]
});