angular.module("myApp")
    .controller("searchController",['$scope','$http','$window','$rootScope','$location','starManage','$route',function($scope,$http,$window,$rootScope,$location,starManage,$route) {
        $http.get("http://localhost:3000/listAllPOIs")
            .then(function (response) {
                $scope.pois = $scope.poisToSave = response.data;
                $scope.catSet =[];
                $scope.catToSave = [];
                $scope.catToSave.push("All");
                for (let i = 0; i < $scope.pois.length; i++)
                    if (!$scope.catSet.includes($scope.pois[i].category))
                        $scope.catSet.push($scope.pois[i].category);
                    Array.prototype.push.apply( $scope.catToSave,$scope.catSet);
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
                                    angular.element('#search_'+response.data[j].category+'_click' + i).addClass('active active-2 active-3');
                                    angular.element('#search_'+response.data[j].category+'_span' + i).addClass('fa-star').removeClass('fa-star-o');
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
        $scope.starClick = function (idx,category) {
            starManage.manageStar("search_"+category,idx,$scope.pois[idx].id)
                .then(function() {
                    if (angular.element('#search_'+category+'_span' + idx).hasClass("fa-star"))
                        $scope.num_of_fav++;
                    else
                        $scope.num_of_fav--;
                });
        };
        $scope.goToRank = function(idx){
            angular.element('.modal').css('display','inline-block');
            $rootScope.pointOfInterest = $scope.pois[idx];
        };
        $scope.showPOI = function (num) {
            $rootScope.poiToShow = $scope.pois[num];
            $location.path('/showPOI');
        };
        $scope.filterByCategory = function (){
            if($scope.cat_select==="All") {
                $scope.pois = $scope.poisToSave;
                $scope.catSet = [];
                for (let i = 1; i < $scope.catToSave.length; i++) {
                    $scope.catSet.push($scope.catToSave[i]);
                }
                $route.reload();
            }
            $scope.catSet = [];
            $scope.catSet.push($scope.cat_select);
        };
        $scope.poiSearched = "";
        $scope.searchForPOI = function(){
            for (let i = 0; i < $scope.poisToSave.length; i++) {
                if($scope.POISearched.toUpperCase()===$scope.poisToSave[i].name.toUpperCase()){
                    var poi = $scope.poisToSave[i];
                    $scope.pois = [];
                    $scope.pois.push(poi);
                    $scope.catSet = [];
                    $scope.catSet.push(poi.category);
                    return;
                }
            }
            $scope.catSet = [];
            $scope.catSet.push("No results found");
        }
    }]);
