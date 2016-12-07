var components = angular.module('components');

components.component('markers',
{
    bindings: {
        'markers': '<',
        'markerClick':'<' 
    },
    template: '<div id="map"></div>',
    controller: ['$q', function ($q) {
   	 	var vm = this;

        vm.$onChanges = function(changes) {
            if(changes.markers){
                if(vm.map){
                    setMarkerMap(vm.markers);
                    vm.map.fitBounds(getBounds(vm.markers));
                }
            }
        };

        vm.$onInit = function() {
            vm.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: -25.363, lng: 131.044}
            });
        };

        var getCenterMap = function() {

        };

        var setMarkerMap = function(markers){
            for(var i = 0; i < markers.length; i++) {
                markers[i].setMap(vm.map);
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