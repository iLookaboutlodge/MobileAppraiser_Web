var components = angular.module('components');

components.component('markers',
{
    bindings: {
        'markers': '<',
        'center': '<',
        'zoom': '<',
        'route': '<'
    },
    template: '<div id="map"></div>',
    controller: ['$q', '$scope', function ($q, $scope) {
   	 	var vm = this;
        vm.mapMarkers = [];

        $scope.$on('resetView', function(e, data){
            vm.setBounds(vm.mapMarkers);
        });

        vm.$onInit = function(){
            if(vm.mapMarkers.length > 0){
                vm.setBounds(vm.mapMarkers);
            }
        };

        vm.$onChanges = function(changes) {          

            if(!vm.map){
                vm.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: vm.zoom,
                    center: vm.center
                });
            }

            if(changes.markers && vm.markers){
                clearCurrentMarkers(vm.mapMarkers);
                //clone markers - needs to be done as previous markers need to be removed
                vm.mapMarkers =  vm.markers.slice();
                addMarkersToMap(vm.mapMarkers);              
            }

            if(changes.center && vm.center) {
                vm.map.setCenter(vm.center);
            }

            if(changes.zoom && vm.zoom) {
                console.log('changing zoom', vm.zoom);
                vm.map.setZoom(vm.zoom);
            }

            if(changes.route && vm.route){
                renderDirectionsPolylines(vm.route, vm.map);
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
            setMarkersMap(markers, vm.map);
            vm.setBounds(markers);

            //set default zoom for 1 marker
            if(markers.length == 1){
                vm.map.setZoom(vm.zoom);
            }
        };

        vm.setBounds = function(markers){
            vm.map.fitBounds(getBounds(markers));
        };

        var getBounds = function(markers){
            var bounds = new google.maps.LatLngBounds();

            for(var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].position);
            }

            return bounds;
        };

        var polylineOptions = {
            strokeColor: '#2A7665',
            strokeOpacity: 1,
            strokeWeight: 5
        };

        var polylines = [];

        var renderDirectionsPolylines = function(response, map) {
            for (var i=0; i<polylines.length; i++) {
                polylines[i].setMap(null);
            }
            var legs = response.routes[0].legs;
            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    var stepPolyline = new google.maps.Polyline(polylineOptions);
                    for (k = 0; k < nextSegment.length; k++) {
                        stepPolyline.getPath().push(nextSegment[k]);
                    }
                    stepPolyline.setMap(map);
                    polylines.push(stepPolyline);
                }
            }
        }
    }]
});