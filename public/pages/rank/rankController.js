angular.module("myApp")
    .controller("rankController",['$scope','$http','$window','$rootScope', function ($scope, $http,$window,$rootScope) {
        $scope.submit = function (form) {
            if(form.desc===undefined)
                form.desc="";
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/rankPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poi_id: $rootScope.pointOfInterest.id,
                    rank: form.rank_number*20,
                    review: form.desc
                }
            };
            $http(req)
                .then(function (response) {
                    $window.alert("Review Added Successfully");
                    angular.element('.modal').css('display','none');
                })
                .catch(function(error){
                    if(error.data.message.includes("PRIMARY KEY"))
                        $window.alert("You have already added review for this POI.")
                });
        };
        $window.onkeydown=function (event){
            if(event.key === "Escape") {
                angular.element('.modal').css('display','none');
            }
        };
        $scope.closeRankWindow = function (){
            angular.element('.modal').css('display','none');
        };
    }]);
