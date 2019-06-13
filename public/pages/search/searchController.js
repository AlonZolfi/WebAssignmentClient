angular.module("myApp")
    .controller("searchController",['$scope','$http',function($scope,$http){
        $http.get("http://localhost:3000/listAllPOIs")
            .then(function (response) {
                $scope.pois = response.data;
            })
            .catch(function (error) {
                console.log("dsa");
            });
    }]);
