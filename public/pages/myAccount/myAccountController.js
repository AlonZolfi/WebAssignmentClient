// poi controller
angular.module("myApp")
    .controller("myAccountController", [ '$scope','$http', '$location','$rootScope','$window','starManage',
        function ($scope,$http, $location, $rootScope, $window, starManage) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/private/recommendedPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            };
            $http(req).then(function (response) {
                    $scope.rec = rec = [];
                    rec.push(response.data[0]);
                    rec.push(response.data[1]);
                    var req1 = {
                        method: 'POST',
                        url: 'http://localhost:3000/private/listFavPOI',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem("token")
                        }
                    };
                    $http(req1).then(function (response) {
                        var pois_to_show = rec;
                        for (let i = 0; i < pois_to_show.length; i++) {
                            for (let j = 0; j < response.data.length; j++) {
                                if (response.data[j].id == pois_to_show[i].id) {
                                    angular.element('#rec_click' + i).addClass('active active-2 active-3');
                                    angular.element('#rec_span' + i).addClass('fa-star').removeClass('fa-star-o');
                                }
                            }

                        }
                    });
                },
                function errorCallback(response) {
                });

            var req2 = {
                method: 'POST',
                url: 'http://localhost:3000/private/lastPOIsSaved',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            };
            $http(req2).then(function (response) {
                    if (response.data.length == 0){
                        $scope.stringSaved = "You did'nt save any Point Of Interest"
                    }
                    else
                    {
                        $scope.stringSaved = "Your last saved Point Of Interest";
                        $scope.saved = saved = [];
                        saved.push(response.data[0]);
                        if(response.data.length>1)
                            saved.push(response.data[1]);
                    }
                },
                function errorCallback(response) {

                });
            $scope.showPOIRecommended = function (num) {
                $rootScope.poiToShow = $scope.rec[num];
                $location.path('/showPOI');
            };
            $scope.showPOISaved = function (num) {
                $rootScope.poiToShow = $scope.saved[num];
                $location.path('/showPOI');
            };
            $scope.starClick = function (idx, type) {
                if(type=='rec')
                    starManage.manageStar(type, idx, $scope.rec[idx].id);
                else {
                    starManage.manageStar(type, idx, $scope.saved[idx].id);
                    $scope.saved.splice(idx,1);
                }
            };
            $scope.goToRank = function(idx,type){
                angular.element('.modal').css('display','inline-block');
                if(type=='rec')
                    $rootScope.pointOfInterest = $scope.rec[idx];
                else
                    $rootScope.pointOfInterest = $scope.saved[idx];
            };
        }]);
