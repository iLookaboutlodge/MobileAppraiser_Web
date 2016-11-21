angular.module('utilities')
    .factory('dateUtility',[
        function () {
            var factory = {};

            var monthNames = [
                  "January", "February", "March",
                  "April", "May", "June", "July",
                  "August", "September", "October",
                  "November", "December"
                ];

            factory.getDate = function(date) {
                var dateObj = new Date(date);
                return dateObj.getDate() + '-' + monthNames[dateObj.getMonth()] + '-' + dateObj.getFullYear();
            };

            return factory;
        }]
    );