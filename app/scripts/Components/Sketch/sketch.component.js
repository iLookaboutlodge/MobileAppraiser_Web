var mainComponent = angular.module('sketchModule', ['property']);

mainComponent.component('sketch',
{
    templateUrl: 'Sketch/sketch.html',
    controller: ['$rootParams','propertyService', function ($rootParams, propertyService) {
        var vm = this;

        propertyService.get($rootParams.id)
            .then(function (property) {
            	console.log('property: ', property);
                vm.sketchUrl = property.SketchUrl;
            });
    }]
});