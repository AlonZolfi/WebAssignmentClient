angular.module("myApp")
    .controller("rankController",['$scope','$http','$window','$rootScope', function ($scope, $http,$window,$rootScope) {
        $scope.submit = function (rank_form ) {
            if(rank_form.desc===undefined)
                rank_form.desc="";
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/rankPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poi_id: $rootScope.pointOfInterest.id,
                    rank: rank_form.rank_number*20,
                    review: rank_form.desc
                }
            };
            $http(req)
                .then(function (response) {
                    $window.alert("Review Added Successfully");
                    angular.element('.modal').css('display','none');
                    angular.element('#rank_form')[0].reset();
                })
                .catch(function(error){
                    if(error.data.message.includes("PRIMARY KEY")) {
                        $window.alert("You have already added review for this POI.");
                        angular.element('#rank_form')[0].reset();
                    }
                });
        };
        $window.onkeydown=function (event){
            if(event.key === "Escape") {
                angular.element('.modal').css('display','none');
                angular.element('#rank_form')[0].reset();
            }
        };
        $scope.closeRankWindow = function (){
            angular.element('.modal').css('display','none');
            angular.element('#rank_form')[0].reset();
        };
    }]);
