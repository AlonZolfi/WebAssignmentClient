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
        };
        $scope.selected_sort = "";
        $scope.sortBy = function () {
            if ($scope.selected_sort === "Category") {
                var compareName = function (poi1, poi2) {
                    return poi1.category.localeCompare(poi2.category);
                };
                $scope.saved_pois.sort(compareName);
            } else if ($scope.selected_sort === "Rank") {
                var compareRank = function (poi1, poi2) {
                    if (poi1.rank < poi2.rank)
                        return 1;
                    else if (poi1.rank > poi2.rank)
                        return -1;
                    else
                        return 0;
                };
                $scope.saved_pois.sort(compareRank);
            }
        };
    }]);
