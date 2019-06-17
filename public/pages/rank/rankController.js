angular.module("myApp")
    .controller("rankController",['$scope','$http','$window','$rootScope', function ($scope, $http,$window,$rootScope) {
        $scope.submit = function (form) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/rankPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poi_id: $rootScope.pointOfInterest.id,
                    rank: form.rank_number,
                    review: form.desc
                }
            };
            $http(req)
                .then(function (response, $location) {
                    $window.alert("Review Added Successfully");
                    angular.element('.modal').css('display','none');
                    form.reset();
                })
        };
        $window.onkeydown=function (event){
            if(event.key === "Escape") {
                angular.element('.modal').css('display','none');
            }
        };
        $scope.closeRankWindow = function (){
            angular.element('.modal').css('display','none');
        }
    }]);
