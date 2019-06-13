angular.module("myApp")
    .controller("logInController", ['$scope','$http', '$location','$rootScope','$window',
        function ($scope,$http, $location, $rootScope, $window) {
        $scope.logIn = function() {
            var myObj = {username: $scope.user_name.valueOf(),password: $scope.user_pass.valueOf()};
            var myJSON = JSON.stringify(myObj);
            $http.post('http://localhost:3000/login', myJSON)
                .then(function (response) {
                    $rootScope.username = $scope.user_name.valueOf();
                    $window.sessionStorage.setItem('token', response.data);
                    alert("You are sing in.. just need to know were to move you");
                    $location.path("/myAccount"); //need to be a "recommended for you"
                })
                .catch(function (error) {
                    //console.log("onononon");
                });
        };
        $scope.logOut = function(){
            $rootScope.username = "Guest";
            $window.sessionStorage.removeItem('token');
            $location.path("/");
        }
    }]);
