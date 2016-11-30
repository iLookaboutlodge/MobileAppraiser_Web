var propertiesComponent = angular.module('components');

propertiesComponent.component('properties', {
    templateUrl: 'Properties/properties.html',
    controller: ['$rootScope', '$scope', '$state', '$filter', '$q', 'propertyService', function($rootScope, $scope, $state, $filter, $q, propertyService) {
        var vm = this;

        $rootScope.$watch('updating', function(){
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
            vm.propertiesChanged();
        });

        var alphabet = ['B','C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        vm.showMap = true;

        vm.filter = {
            WorkStatus: 'unscheduled'
        };

        vm.properties = [];
        
        vm.goToProperty = function (propertyId) {
            $state.go("property", {id: propertyId});
        };

        vm.scheduleProperty = function(property) {
            property.WorkStatus = 'scheduled';
            propertyService.update(property);
        };

        vm.unscheduleProperty = function(property) {
            property.WorkStatus = 'unscheduled';
            propertyService.update(property);
        };

        vm.propertiesChanged = function(){
            return applyFilter().then(setFilteredProperties);
        };

        var applyFilter = function() {
            var deferred = $q.defer();
            deferred.resolve($filter('filter')(vm.properties, vm.filter, true));
            return deferred.promise;
        };

        var setFilteredProperties = function(filtered){
            console.log('filtered', filtered);
            vm.filteredProperties = filtered;
        };

        vm.routesChanged = function(routes) {
            console.log('routechanged', routes);

            if(routes && routes.length >= 1){    

                var order = routes[0].waypoint_order;

                for(var i = 0; i < vm.filteredProperties.length; i++){
                    vm.filteredProperties[i].order = order[i];
                    vm.filteredProperties[i].markerLetter = alphabet[i];
                }
            }
        };

        vm.$onInit = function () {
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
            vm.propertiesChanged();
        };
    }]
});