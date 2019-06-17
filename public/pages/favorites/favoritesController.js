angular.module("myApp")
    .controller("favoritesController",['$scope','$http','$window','starManage','$route',function($scope,$http,$window,starManage,$route) {
        var req1 = {
            method: 'POST',
            url: 'http://localhost:3000/private/listFavPOI',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        $scope.num_of_fav = 0;
        $http(req1)
            .then(function (response) {
                $scope.saved_pois = response.data;
                $scope.num_of_fav = response.data.length;
            });

        $scope.starClick = function (idx) {
            starManage.manageStar("fav",idx,$scope.saved_pois[idx].id)
                .then(function(response){
                    $route.reload();
                });
        }
    }]);
