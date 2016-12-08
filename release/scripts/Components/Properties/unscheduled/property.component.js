var components = angular.module('components');

components.component('unscheduledproperty', {
    bindings: {
        'property': '<',
        'back': '&',
        'update': '&'
    },
    templateUrl: 'Properties/unscheduled/property.html',
    controller: ['$state', 'imageService', 'propertyService', function($state, imageService, propertyService) {
        var vm = this;

        vm.$onChanges = function(){
            if(vm.property){
                imageService.getImagesForProperty(vm.property.Id).then(function(images) {
                    vm.propertyImages = images;
                });
            }
        };

        vm.onSchedule = function() {
            propertyService.scheduleProperty(vm.property)
                .then(vm.update())
                .then(vm.back());
        };
    }]
});