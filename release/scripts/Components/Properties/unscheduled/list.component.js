var components = angular.module('components');

components.component('unscheduledpropertylist', {
    bindings: {
        'properties': '<',
        'onpropertyselected': '&',
    },
    templateUrl: 'Properties/unscheduled/list.html',
    controller: [function() {
         var vm = this;

         vm.locationChanged = function() {
             vm.updatelocation({start:vm.start, end:vm.end});
         };

         vm.propertyClick = function(property) {
             var index = vm.properties.indexOf(property);
             vm.onpropertyselected({index: index});
         };
    }]
});