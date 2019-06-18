angular.module("myApp")
    .controller("showPOIController",['$scope','$http','$rootScope','getPOIService',function ($scope, $http, $rootScope, getPOIService) {
        getPOIService.getPOIData($rootScope.poiToShow.id).then(function(response){
            $scope.poi = response.data[0];
            $scope.reviews = [];
            for (let i = 1; i < response.data.length; i++) {
                $scope.reviews.push(response.data[i]);
            }
        });

    }]);


