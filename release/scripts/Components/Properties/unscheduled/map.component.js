var components = angular.module('components');

components.component('unscheduledmap', {
    bindings: {
        'properties': '<',
        'distanceCallback': '&',
        'selectedpropertyindex': '<',
        'propertyselected': '&'
    },
    templateUrl: 'Properties/unscheduled/map.html',
    controller: ['$q','$rootScope', '$scope', 'locationService', function($q, $rootScope, $scope, locationService) {
        var vm = this;
        vm.markers = [];
        vm.zoom = 14;
        vm.center = {lat: -25.363, lng: 131.044};

        vm.$onChanges = function(changes) {

            if(changes.properties){
                vm.markers = createMarkers(vm.properties);
                console.log('markers', vm.markers);
            }
            
            if(changes.selectedpropertyindex && vm.markers) {
                console.log('selectedpropertyindex', vm.selectedpropertyindex);
                disableBounce(vm.markers);

                if(vm.selectedpropertyindex != null && vm.selectedpropertyindex >= 0){
                    google.maps.event.trigger(vm.markers[vm.selectedpropertyindex], 'click');
                    vm.center = vm.markers[vm.selectedpropertyindex].getPosition();
                }
                else {
                   $scope.$broadcast('resetView');
                }
            }
        };

        var getLatLng = function(propertyLocation) {
            return new google.maps.LatLng(propertyLocation.Latitude, propertyLocation.Longitude);
        }

        var createMarkers = function(properties){
            var markers = [];

            for(var i = 0; i < properties.length; i++) {
                markers.push(createMarker(properties[i], i));
            }

            return markers;
        };

        var createMarker = function(property, index) {
            var latLng = getLatLng(property.Location);
            var marker = new google.maps.Marker({position: latLng});
            marker.addListener('click', function(){
                disableBounce(vm.markers);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                vm.propertyselected({index:index});
                if(!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
            return marker;
        };

        var disableBounce = function(markers) {
            for(var i = 0; i < markers.length; i++){
                markers[i].setAnimation(null);
            }
        };
    }]
});