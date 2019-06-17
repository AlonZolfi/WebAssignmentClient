angular.module("myApp")
    .controller("favoritesController",['$scope','$http','$window','starManage',function($scope,$http,$window,starManage) {
        $scope.$on('$viewContentLoaded', function() {
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
        });
        $scope.starClick = function (idx) {
            starManage.manageStar("favorits",idx,$scope.saved_pois[idx].id);
            if($('#favorits_span' + idx).hasClass("fa-star"))
                $scope.num_of_fav--;
            else
                $scope.num_of_fav++;
        }
    }]);
