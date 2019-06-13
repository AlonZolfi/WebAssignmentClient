// poi controller
angular.module("myApp")
    .controller("myAccountController", [ '$scope','$http', '$location','$rootScope','$window',
        function ($scope,$http, $location, $rootScope, $window) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/recommendedPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            };
            $http(req).then(function (response) {
                    var images = document.querySelectorAll("#rec img")
                    images[0].src = response.data[0].image;
                    images[1].src = response.data[1].image;
                },
                function errorCallback(response) {
                    console.log("onononon");
                });

            var req2 = {
                method: 'POST',
                url: 'http://localhost:3000/private/lastPOIsSaved',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            };
            $http(req2).then(function (response) {
                    var images = document.querySelectorAll("#saved img")
                    images[0].src = response.data[0].image;
                    images[1].src = response.data[1].image;
                },
                function errorCallback(response) {
                    console.log("onononon");
                });
        }]);
