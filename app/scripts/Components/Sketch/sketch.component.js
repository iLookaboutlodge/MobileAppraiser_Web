var mainComponent = angular.module('components');

mainComponent.component('sketch',
{
    templateUrl: 'Sketch/sketch.html',
    controller: ['$rootParams','sketchService', function ($rootParams, sketchService) {
        var vm = this;

        sketchService.get($rootParams.id)
            .then(function (property) {
            	console.log('property: ', property);
                vm.sketchUrl = property.SketchUrl;
            });
    }]
});