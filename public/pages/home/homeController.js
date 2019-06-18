angular.module("myApp")
    .controller("homeController", ['$scope','$http','$rootScope','$location','$window', function($scope,$http,$rootScope,$location,$window){
        $http.get('http://localhost:3000/listAllPOIs')
            .then(function (response) {
                $scope.images = images = [];
                images.push(response.data[0]);
                images.push(response.data[1]);
                images.push(response.data[2]);
            })
            .catch(function (error) {
                console.log("dsa");
            });
        $scope.showPOI = function (num) {
            $rootScope.poiToShow = images[num];
            $location.path('/showPOI');
        };
    }]);
