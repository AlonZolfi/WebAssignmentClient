angular.module("myApp")
    .controller("searchController",['$scope','$http','$window','$rootScope','starManage',function($scope,$http,$window,$rootScope,starManage) {
        $http.get("http://localhost:3000/listAllPOIs")
            .then(function (response) {
                $scope.pois = response.data;
                if ($rootScope.userLogged === 'Yes') {
                    var req1 = {
                        method: 'POST',
                        url: 'http://localhost:3000/private/listFavPOI',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem("token")
                        }
                    };
                    $scope.num_of_fav = 0;
                    $http(req1).then(function (response) {
                        var pois_to_show = $scope.pois;
                        for (let i = 0; i < pois_to_show.length; i++) {
                            for (let j = 0; j < response.data.length; j++) {
                                if (response.data[j].id == pois_to_show[i].id) {
                                    angular.element('#search_click' + i).addClass('active active-2 active-3');
                                    angular.element('#search_span' + i).addClass('fa-star').removeClass('fa-star-o');
                                    $scope.num_of_fav++;
                                }
                            }
                        }
                    });
                }
            });
        $scope.selected_sort = "";
        $scope.sortBy = function () {
            if ($scope.selected_sort === "Name") {
                var compareName = function (poi1, poi2) {
                    return poi1.name.localeCompare(poi2.name);
                };
                $scope.pois.sort(compareName);
            } else if ($scope.selected_sort === "Rank") {
                var compareRank = function (poi1, poi2) {
                    if (poi1.rank < poi2.rank)
                        return 1;
                    else if (poi1.rank > poi2.rank)
                        return -1;
                    else
                        return 0;
                };
                $scope.pois.sort(compareRank);
            }
        };
        $scope.starClick = function (idx) {
            starManage.manageStar("search",idx,$scope.pois[idx].id)
                .then(function() {
                    if (angular.element('#search_span' + idx).hasClass("fa-star"))
                        $scope.num_of_fav--;
                    else
                        $scope.num_of_fav++;
                });
        };
        $scope.goToRank = function(idx){
            angular.element('.modal').css('display','inline-block');
            $rootScope.pointOfInterest = $scope.pois[idx];
        }
    }]);
