angular.module("myApp")
    .controller("rankController",['$scope','$http','$rootScope', function ($scope, $http,$rootScope) {
        $scope.submit = function () {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/rankPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    username: $scope.rank_number.valueOf(),
                    password: $scope.desc.valueOf()
                }
            };
            $http(req)
                .then(function (response, $location) {

                })
                .catch(function (error) {

                });
        };
    }]);
