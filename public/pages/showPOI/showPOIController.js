angular.module("myApp")
    .controller("showPOIController",['$scope','$http','$rootScope','getPOIService',function ($scope, $http, $rootScope, getPOIService) {
        getPOIService.getPOIData($rootScope.poiToShow.id).then(function(response){
            console.log(response.data[0]);
            $scope.poi = response.data[0];
        })
    }]);


