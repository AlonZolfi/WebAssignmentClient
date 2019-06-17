angular.module("myApp")
    .factory("getPOIService",['$http',function($http){
        var getData = {};
        getData.getPOIData = function(poi_id){
            return $http.get('http://localhost:3000/POIData/'+poi_id);
        };
        return getData;
    }]);
angular.module("myApp")
    .factory("starManage",['$http','$window',function($http,$window) {
        var starData = {};
        starData.manageStar = function(page_name, idx, poi_id) {
            if ($('#'+page_name+'_span' + idx).hasClass("fa-star")) {
                $('#'+page_name+'_click' + idx).removeClass('active');
                setTimeout(function () {
                    $('#'+page_name+'_click' + idx).removeClass('active-2')
                }, 30);
                $('#'+page_name+'_click' + idx).removeClass('active-3');
                setTimeout(function () {
                    $('#'+page_name+'_span' + idx).removeClass('fa-star');
                    $('#'+page_name+'_span' + idx).addClass('fa-star-o')
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
                $http(req1);
            } else {
                $('#'+page_name+'_click' + idx).addClass('active');
                $('#'+page_name+'_click' + idx).addClass('active-2');
                setTimeout(function () {
                    $('#'+page_name+'_span' + idx).addClass('fa-star');
                    $('#'+page_name+'_span' + idx).removeClass('fa-star-o')
                }, 150);
                setTimeout(function () {
                    $('#'+page_name+'_click' + idx).addClass('active-3');
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
                $http(req2);
            }
        };
        return starData;
    }]);
