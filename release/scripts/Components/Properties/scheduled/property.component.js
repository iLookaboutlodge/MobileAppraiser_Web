var components = angular.module('components');

components.component('scheduledproperty', {
    bindings: {
        'property': '<',
        'back': '&',
        'update': '&'
    },
    templateUrl: 'Properties/scheduled/property.html',
    controller: ['$state', 'imageService', 'propertyService', function($state, imageService, propertyService) {
        var vm = this;

        vm.$onInit = function(){
            if(vm.property){
                imageService.getImagesForProperty(vm.property.Id).then(function(images) {
                    vm.propertyImages = images;
                });
            }
        };

        vm.goToProperty = function(propertyId) {
            $state.go("property", { id: propertyId });
        };

        vm.onComplete = function(){
            propertyService.completeProperty(vm.property)
                .then(vm.update())
                .then(vm.back());
        };

        vm.onUnschedule = function() {
            propertyService.unScheduleProperty(vm.property)
                .then(vm.update())
                .then(vm.back());
        };
    }]
});