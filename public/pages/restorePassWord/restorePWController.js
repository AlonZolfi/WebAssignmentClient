let controller = angular.module("myApp")
    .controller("restorePWController", ['$scope','$http','$rootScope','$window',
        function ($scope,$http, $rootScope, $window) {
            $scope.passWD = "Your password will be here";
            $scope.restorePW = function () {
                var myObj = {username: $scope.user_name_restored.valueOf(), question: $scope.question_restored.valueOf().question ,answer: $scope.user_ans_restored.valueOf()};
                var myJSON = JSON.stringify(myObj);
                $http.post('http://localhost:3000/restorePassword ', myJSON)
                    .then(function (response) {
                        $scope.passWD = "You password is: "+ response.data.password;
                    })
                    .catch(function (error) {
                        $scope.passWD = "Something want wrong!";
                    });
            };
            $scope.questions = [
                {
                    "question": "Whats the name of your elementary school?"
                },
                {
                    "question": "Whats your mothers family name before marriage?"
                },
                {
                    "question": "What was your first pet name?"
                },
                {
                    "question": "Whats the name of your best friend?"
                }
            ]
        }]);