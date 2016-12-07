var components = angular.module('components');

components.component('scheduledpropertylist', {
    bindings: {
        'properties': '<',
        'onpropertyselected': '&',
        'updatelocation': '&'
    },
    templateUrl: 'Properties/scheduled/list.html',
    controller: ['$state', '$filter', '$q', function($state, $filter, $q) {
         var vm = this;

         vm.locationChanged = function() {
             vm.updatelocation({start:vm.start, end:vm.end});
         };

         vm.propertyClick = function(property) {
             vm.onpropertyselected({property: property});
         };
    }]
});