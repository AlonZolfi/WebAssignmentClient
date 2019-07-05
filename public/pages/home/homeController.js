angular.module("myApp")
    .controller("homeController", ['$scope','$http','$rootScope','$location','$window','starManage', function($scope,$http,$rootScope,$location,$window,starManage){
        $http.get('http://localhost:3000/randomPOI/0')
            .then(function (response) {
                $scope.images = images = [];
                images.push(response.data[0]);
                images.push(response.data[1]);
                images.push(response.data[2]);
                if ($rootScope.userLogged === 'Yes') {
                    var req1 = {
                        method: 'POST',
                        url: 'http://localhost:3000/private/listFavPOI',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem("token")
                        }
                    };
                    $http(req1).then(function (response) {
                        var pois_to_show = $scope.images;
                        for (let i = 0; i < pois_to_show.length; i++) {
                            for (let j = 0; j < response.data.length; j++) {
                                if (response.data[j].id == pois_to_show[i].id) {
                                    angular.element('#home_click' + i).addClass('active active-2 active-3');
                                    angular.element('#home_span' + i).addClass('fa-star').removeClass('fa-star-o');
                                }
                            }

                        }
                    });
                }
            })
            .catch(function (error) {
            });

        $scope.showPOI = function (num) {
            $rootScope.poiToShow = images[num];
            $location.path('/showPOI');
        };
        $scope.goToRank = function(idx){
            angular.element('.modal').css('display','inline-block');
            $rootScope.pointOfInterest = $scope.images[idx];
        };
        $scope.starClick = function (idx) {
            starManage.manageStar("home", idx, $scope.images[idx].id);
        };
    }]);

