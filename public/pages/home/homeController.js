angular.module("myApp")
    .controller("homeController", ['$scope','$http', function($scope,$http){
        //var quadimages = document.querySelectorAll("#quad figure");
        /*for(i=0; i<quadimages.length; i++) {
            quadimages[i].addEventListener('click', function(){ this.classList.toggle("expanded"); quad.classList.toggle("full") });
        }*/
        var minimalRank = 0;
        $http.get('http://localhost:3000/randomPOI/'+minimalRank)
            .then(function (response) {
                $scope.images = images = [];
                images.push(response.data[0]);
                images.push(response.data[1]);
                images.push(response.data[2]);
            })
            .catch(function (error) {
                console.log("dsa");
            });
    }]);
