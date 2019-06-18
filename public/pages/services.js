angular.module("myApp")
    .factory("getPOIService",['$http',function($http){
        var getData = {};
        getData.getPOIData = function(poi_id){
            var req = {
                method: 'PUT',
                url: 'http://localhost:3000/increaseNumOfViews',
                data: {
                    poi_id: poi_id,
                }
            };
            $http(req);
            return $http.get('http://localhost:3000/POIData/'+poi_id);
        };
        return getData;
    }]);
angular.module("myApp")
    .factory("starManage",['$http','$window',function($http,$window) {
        var starData = {};
        starData.manageStar = function(page_name, idx, poi_id) {
            if (angular.element('#'+page_name+'_span' + idx).hasClass("fa-star")) {
                angular.element('#'+page_name+'_click' + idx).removeClass('active');
                setTimeout(function () {
                    angular.element('#'+page_name+'_click' + idx).removeClass('active-2')
                }, 30);
                angular.element('#'+page_name+'_click' + idx).removeClass('active-3');
                setTimeout(function () {
                    angular.element('#'+page_name+'_span' + idx).removeClass('fa-star');
                    angular.element('#'+page_name+'_span' + idx).addClass('fa-star-o')
                }, 15);
                var req1 = {
                    method: 'POST',
                    url: 'http://localhost:3000/private/removeFavPOI',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem("token")
                    },
                    data: {
                        'poi_id': poi_id
                    }
                };
                return $http(req1);
            } else {
                angular.element('#'+page_name+'_click' + idx).addClass('active');
                angular.element('#'+page_name+'_click' + idx).addClass('active-2');
                setTimeout(function () {
                    angular.element('#'+page_name+'_span' + idx).addClass('fa-star');
                    angular.element('#'+page_name+'_span' + idx).removeClass('fa-star-o')
                }, 150);
                setTimeout(function () {
                    angular.element('#'+page_name+'_click' + idx).addClass('active-3');
                }, 150);
                var req2 = {
                    method: 'POST',
                    url: 'http://localhost:3000/private/saveFavPOI',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem("token")
                    },
                    data: {
                        'poi_id': poi_id
                    }
                };
                return $http(req2);
            }
        };
        return starData;
    }]);
