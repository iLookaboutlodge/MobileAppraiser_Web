var components = angular.module('components');

components.component('scheduledproperty', {
    bindings: {
        'property': '<',
        'back': '&'
    },
    templateUrl: 'Properties/scheduled/scheduled.property.html',
    controller: ['$state', 'imageService', function($state, imageService) {
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
    }]
});