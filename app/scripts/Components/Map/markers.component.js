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
        vm.mapMarkers = [];

        vm.$postLink = function() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: vm.zoom,
                center: vm.center
            });
        };

        vm.$onChanges = function(changes) {
            if(changes.markers && vm.map){
                clearCurrentMarkers(vm.mapMarkers);
                //clone markers - needs to be done as previous markers need to be removed
                vm.mapMarkers =  vm.markers.slice();
                addMarkersToMap(vm.mapMarkers);                
            }

            if(changes.center && vm.map) {
                vm.map.setCenter(vm.center);
            }

            if(changes.zoom && vm.map) {
                vm.map.setZoom(vm.zoom);
            }
        };

        var setMarkersMap = function(markers, map) {
            for(var i =0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        var clearCurrentMarkers = function(markers){
            setMarkersMap(markers, null);

            for(var i=0; i < markers.length; i++){
                markers[i] = null;
            }
        };

        var addMarkersToMap = function(markers) {
            setMarkersMap(vm.markers, vm.map);
            vm.map.fitBounds(getBounds(markers));

            //set default zoom for 1 marker
            if(markers.length == 1){
                vm.map.setZoom(vm.zoom);
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