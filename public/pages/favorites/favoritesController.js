angular.module("myApp")
    .controller("favoritesController",['$scope','$http','$window','starManage','$route','$rootScope','$location',function($scope,$http,$window,starManage,$route,$rootScope,$location) {
        var req1 = {
            method: 'POST',
            url: 'http://localhost:3000/private/FavPOIOrder',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        $scope.num_of_fav = 0;
        $http(req1)
            .then(function (response1) {
                var req = {
                    method: 'POST',
                    url: 'http://localhost:3000/private/listFavPOI',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem("token")
                    }
                };
                $http(req)
                    .then(function (response2) {
                        $scope.num_of_fav = response2.data.length;
                        $scope.saved_pois = [];
                        if (response1.data.length == 0)
                            $scope.saved_pois = response2.data;
                        else {
                            for (let i = 0; i < response1.data.length; i++) {
                                for (let j = 0; j < response2.data.length; j++) {
                                    if (response1.data[i].id == response2.data[j].id) {
                                        $scope.saved_pois.push(response2.data[j]);
                                        break;
                                    }
                                }
                            }
                            $scope.saveFavOrder();
                            for (let i = 0; i < response2.data.length; i++) {
                                var found = false;
                                for (let j = 0; j < $scope.saved_pois.length; j++) {
                                    if(response2.data[i].id==$scope.saved_pois[j].id)
                                        found = true;
                                }
                                if(!found)
                                    $scope.saved_pois.push(response2.data[i]);
                            }
                        }
                    });

                $scope.starClick = function (idx) {
                    starManage.manageStar("fav", idx, $scope.saved_pois[idx].id)
                        .then(function (response) {
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

                $scope.showPOI = function (num) {
                    $rootScope.poiToShow = $scope.saved_pois[num];
                    $location.path('/showPOI');
                };
                $scope.up = function (idx) {
                    var temp = $scope.saved_pois[idx - 1];
                    $scope.saved_pois[idx - 1] = $scope.saved_pois[idx];
                    $scope.saved_pois[idx] = temp;
                };
                $scope.down = function (idx) {
                    var temp = $scope.saved_pois[idx + 1];
                    $scope.saved_pois[idx + 1] = $scope.saved_pois[idx];
                    $scope.saved_pois[idx] = temp;
                };

                $scope.clickSaved=function(){
                    $scope.saveFavOrder();
                    $window.alert("List saved!")
                };
                $scope.saveFavOrder = function () {
                    var order = [];
                    for (let i = 0; i < $scope.saved_pois.length; i++)
                        order.push({poi_id: $scope.saved_pois[i].id});
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:3000/private/saveFavOrderOfPOI',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem("token")
                        },
                        data: {
                            "order": order
                        }
                    };
                    $http(req)
                        .then(function (response) {

                        })
                        .catch(function (error) {
                        });
                };
                $scope.goToRank = function(idx){
                    angular.element('.modal').css('display','inline-block');
                    $rootScope.pointOfInterest = $scope.saved_pois[idx];
                };
            });
    }]);
