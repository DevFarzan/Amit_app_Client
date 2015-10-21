(function() {

    'use strict';
    var userLocation='';


    angular
        .module('chatAppModule')
        .factory('Login',['$http', function ($http) {
            return {
                getUserLocation: function () {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log(position.coords.latitude + ',' + position.coords.longitude);
                        var _loc = position.coords.latitude + ',' + position.coords.longitude;



                 $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+_loc +'&key=AIzaSyDhMPFM50yo4Is2afbhqgStOWTPULLr0F8',{
                  }).success(function(response) {
                      console.log(response);
                     localStorage.setItem('location', response.results[0].formatted_address);
                     userLocation = response.results[0].formatted_address;
                  });
                    });
                }
            }
        }]);
})();