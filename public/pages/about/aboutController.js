
angular.module("myApp")
.controller("aboutController", ['$scope','$http',function ($scope,$http) {
    var minimalRank = 0;
    $http.get('http://localhost:3000/randomPOI/'+minimalRank)
        .then(function (response) {
            $scope.images = images = [];
            images.push(response.data[0]);
            images.push(response.data[1]);
            images.push(response.data[2]);
        })
        .catch(function (error) {
        });

}]);
