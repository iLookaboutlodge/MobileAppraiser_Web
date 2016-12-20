var loadingComponent = angular.module('components');

loadingComponent.component('loading', {
    template: '<div class="loadingWrapper"><i class="loadingSpinner fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Loading</span></div>',
    controller: [function() {
        var vm = this;
    }]
});