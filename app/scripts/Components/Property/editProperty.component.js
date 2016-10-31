var propertyComponent = angular.module('editPropertyModule', ['property']);
propertyComponent.component('editproperty',
{
	templateUrl: 'Property/editProperty.html',
	controller: ['$stateParams', '$scope', 'propertyService', function ($stateParams, $scope, propertyService) {

	    var vm = this;

	    vm.propertyId = $stateParams.id;

	    vm.getDetail = function (detail) {
	        for (var i = 0; i < vm.property.Data.length; i++) {
	            if (vm.property.Data[i].FieldId == detail.Id) {
	                return vm.property.Data[i].Value;
	            }
	        }
	        console.log('not found:', detail.Label);
	        return null;
	    }

	    vm.getHeaders = function(value) {
	        if (value)
	            return value[Object.keys(value)[0]];

	        return null;
	    }

        vm.complete = function () {

            for (var i = 0; i < vm.newProperty.Data["1"].length; i++) {
                if (vm.newProperty.Data["1"][i].Field.Id == 72) {
                    vm.newProperty.Data["1"][i].Data.Value = "4";
                }
            };

            var date = new Date();
            var time = ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
            vm.newProperty.DateReviewed = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + time;
            vm.next();
        }

        function init () {
            return propertyService.get(vm.propertyId)
                .then(function (result) {
                    vm.newProperty = result;
                });
        }
         
        init();
	}]
});