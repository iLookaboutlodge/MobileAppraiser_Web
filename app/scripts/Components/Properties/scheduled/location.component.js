var components = angular.module('components');

components.component('maporigindest', {
    bindings: {
        'updatelocation': '&'
    },
    templateUrl: 'Properties/scheduled/location.html',
    controller: [function() {

         var vm = this;

         vm.locationChanged = function() {
             vm.updatelocation({start:vm.start, end:vm.end});
         };
    }]
});