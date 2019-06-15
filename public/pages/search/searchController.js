angular.module("myApp")
    .controller("searchController",['$scope','$http',function($scope,$http){
        $http.get("http://localhost:3000/listAllPOIs")
            .then(function (response) {
                $scope.pois = response.data;
            })
            .catch(function (error) {
                console.log("dsa");
            });
        $scope.selected_sort = "";
        $scope.sortBy = function () {
            if ($scope.selected_sort === "Name") {
                var compareName = function (poi1, poi2) {
                    return poi1.name.localeCompare(poi2.name);
                };
                $scope.pois.sort(compareName);
            }
            else {
                var compareRank = function (poi1, poi2) {
                    if(poi1.rank < poi2.rank)
                        return 1;
                    else if (poi1.rank > poi2.rank)
                        return -1;
                    else
                        return 0;
                };
                $scope.pois.sort(compareRank);
            }
        }
    }]);
