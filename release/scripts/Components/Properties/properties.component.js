var propertiesComponent = angular.module('propertiesModule', ['property']);

propertiesComponent.component('properties', {
    templateUrl: 'Properties/properties.html',
    controller: ['$rootScope', '$scope', '$state', 'propertyService', function($rootScope, $scope, $state, propertyService) {
        var vm = this;

        vm.getPropertyDetail = function (detail, property) {

            var keys = Object.keys(property.Data);

            for (var i = 0; i < keys.length; i++) {
                var group = property.Data[keys[i]];

                for (var j = 0; j < group.length; j++) {
                    var option = group[j];
                    
                    if (option.Field.LabelCode == detail) {
                        if (option.Field.Type === 2) {
                            return option.Data.Value;
                        }
                        else if (option.Field.Type === 5) {
                            return option.Field.Values[option.Data.Value];
                        }
                    }
                }
            }
        }

        $rootScope.$watch('updating', function(){
            //should show loading screen here
            init();
        });

        vm.goToProperty = function (propertyId) {
            $state.go("property", {id: propertyId});
        };

        var init = function () {
            propertyService.getAll()
                .then(function (result) {
                     vm.properties = result;
                });
        }

        init();
    }]
});