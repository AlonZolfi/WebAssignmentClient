// poi controller
angular.module("myApp")
    .controller("myAccountController", [ '$scope','$http', '$location','$rootScope','$window',
        function ($scope,$http, $location, $rootScope, $window) {
            function getRecPOI() {
                var myObj = {key: "x-auth-token",value: $window.sessionStorage.getItem("token") };
                var myJSON = JSON.stringify(myObj);
                $http.post('http://localhost:3000/recommendedPOI', myJSON)
                    .then(function (response) {
                        console.log("hbdfhdfhd");
                    })
                    .catch(function (error) {
                        console.log("onononon");
                    });
            };

            function getSavedPOI() {
                var myObj = {key: "x-auth-token",value: $window.sessionStorage.getItem("token") };
                var myJSON = JSON.stringify(myObj);
                $http.post('http://localhost:3000/lastPOIsSaved', myJSON)
                    .then(function (response) {
                        console.log("hbdfhdfhd");
                    })
                    .catch(function (error) {
                        console.log("onononon");
                    });
            };

        }]);