var components = angular.module('components');

components.component('markers',
{
    bindings: {
        'markers': '<',
        'center': '<',
        'zoom': '<'
    },
    template: '<div id="map"></div>',
    controller: ['$q', function ($q) {
   	 	var vm = this;
        vm.markers = [];
            
        vm.$postLink = function() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: vm.defaultZoom,
                center: vm.center
            });
        };

        vm.$onChanges = function(changes) {
            if(changes.markers){
                //remove all markers from map
                setMarkersMap(vm.markers, null);
                vm.markers = [];

                //add markers to map
                setMarkerMap(vm.markers, vm.map);
                vm.map.fitBounds(getBounds(vm.markers));

                //set default zoom for 1 marker
                if(vm.markers.length == 1){
                    vm.map.setZoom(defaultZoom);
                }
            }

            if(changes.center) {
                vm.map.setCenter(center);
            }

            if(changes) {
                vm.map.setZoom(zoom);
            }
        };

        var setMarkersMap = function(markers, map) {
            for(var i =0; i < markers.length; i++) {
                markers[i].setMap(map);
                markers[i] = null;
            }
        }

        var getBounds = function(markers){
            var bounds = new google.maps.LatLngBounds();

            for(var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].position);
            }

            return bounds;
        };
    }]
});