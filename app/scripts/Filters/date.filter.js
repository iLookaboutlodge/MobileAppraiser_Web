angular.module('filters')
	.filter('dateString', ['dateUtility',function(dateUtility){
		return function(date){
			return dateUtility.getDate(date);
		};
	}]);