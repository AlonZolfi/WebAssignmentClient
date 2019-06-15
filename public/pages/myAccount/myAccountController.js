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
                    $scope.rec = rec = [];
                    rec.push(response.data[0]);
                    rec.push(response.data[1]);
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
                    if (response.data.length == 0){
                        $scope.stringSaved = "You did'nt save any Point Of Interest"
                    }
                    else
                    {
                        $scope.stringSaved = "Your saved Point Of Interest"
                        $scope.saved = saved = [];
                        saved.push(response.data[0]);
                        saved.push(response.data[1]);
                    }
                },
                function errorCallback(response) {
                    console.log("onononon");
                });

        }]);
