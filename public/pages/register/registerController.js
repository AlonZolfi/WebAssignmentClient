angular.module("myApp")
    .controller("registerController",['$scope','$http','$window','$location', function ($scope, $http, $window,$location) {
        $scope.submit = function(){
            if($scope.category.length <= 1){
                $window.alert("Please choose more than 2 interests");
                return;
            }
            likedCategories = [];
            for (let i = 0; i < $scope.category.length; i++) {
                likedCategories.push({interest:$scope.category[i]});
            }
            var myObj = {
                username: $scope.user_name.valueOf(),
                password: $scope.password.valueOf(),
                firstname: $scope.first_name.valueOf(),
                lastname: $scope.last_name.valueOf(),
                city: $scope.city.valueOf(),
                country: $scope.country.valueOf().name,
                email: $scope.email.valueOf(),
                authQuestion:[
                    {
                        question: $scope.question1.question,
                        answer: $scope.answer1
                    },
                    {
                        question: $scope.question2.question,
                        answer: $scope.answer2
                    }
                ],
                interests: likedCategories
            };
            var myJSON = JSON.stringify(myObj);
            $http.post('http://localhost:3000/registerUser', myJSON)
                .then(function (response) {
                    alert("Registered Successfully");
                    $location.path('/login');
                })
                .catch(function(error){
                    if(error.data.message != undefined && error.data.message.includes("PRIMARY KEY"))
                        alert("Please choose a different user name.")
                });
        };
        $scope.user_regex = /^[a-zA-Z]+$/;
        $scope.email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        $scope.password_regex = /^[a-zA-Z0-9]+$/;
        $http.get('http://localhost:3000/listCategories')
            .then(function(response){
                $scope.interests = response.data;
                $scope.category = response.data[0].category_name;
            });
        $http.get('http://localhost:3000/listCountries')
            .then(function(response){
                $scope.countries = response.data;
                $scope.country = response.data[0].name;
            });
        $scope.questionsOne = [
            {
                "question": "Whats the name of your elementary school?"
            },
            {
                "question": "Whats your mothers family name before marriage?"
            }
        ];
        $scope.questionsTwo = [
            {
                "question": "What was your first pet name?"
            },
            {
                "question": "Whats the name of your best friend?"
            }
        ];
        $scope.question1 = $scope.questionsOne[0];
        $scope.question2 = $scope.questionsTwo[0];
    }]);

/*var countries = [
    {
        "ID": "1",
        "Name": "Australia"
    },
    {
        "ID": "2",
        "Name": "Bolivia"
    },
    {
        "ID": "3",
        "Name": "China"
    },
    {
        "ID": "4",
        "Name": "Denemark"
    },
    {
        "ID": "5",
        "Name": "Israel"
    },
    {
        "ID": "6",
        "Name": "Latvia"
    },
    {
        "ID": "7",
        "Name": "Monaco"
    },
    {
        "ID": "8",
        "Name": "August"
    },
    {
        "ID": "9",
        "Name": "Norway"
    },
    {
        "ID": "10",
        "Name": "Panama"
    },
    {
        "ID": "11",
        "Name": "Switzerland"
    },
    {
        "ID": "12",
        "Name": "USA"
    }
]*/
