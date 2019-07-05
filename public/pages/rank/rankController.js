angular.module("myApp")
    .controller("rankController",['$scope','$http','$window','$rootScope','$route', function ($scope, $http,$window,$rootScope,$route) {
        $scope.submit = function (rank_form) {
            if(rank_form.desc===undefined)
                rank_form.desc="";
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/rankPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data:{
                    poi_id: $rootScope.pointOfInterest.id,
                    rank: rank_form.rank_number*20,
                    review: rank_form.desc
                }
            };
            $http(req)
                .then(function (response) {
                    $window.alert("Review Added Successfully");
                    angular.element('.modal').css('display','none');
                    resetRankForm();
                    $route.reload();
                })
                .catch(function(error){
                    if(error.data.message.includes("PRIMARY KEY")) {
                        $window.alert("You have already added review for this POI.");
                        resetRankForm();
                    }
                });
        };
        $window.onkeydown=function (event){
            if(event.key === "Escape") {
                angular.element('.modal').css('display','none');
                resetRankForm();
            }
        };
        $scope.closeRankWindow = function (){
            angular.element('.modal').css('display','none');
            resetRankForm();
        };
    }]);

function resetRankForm(){
    angular.element('#rank_form')[0].reset();
}
