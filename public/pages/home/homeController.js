angular.module("myApp")
    .controller("homeController", ['$scope','$http', function($scope,$http){
        //var quadimages = document.querySelectorAll("#quad figure");
        /*for(i=0; i<quadimages.length; i++) {
            quadimages[i].addEventListener('click', function(){ this.classList.toggle("expanded"); quad.classList.toggle("full") });
        }*/
        var minimalRank = 3;
        $http.get('http://localhost:3000/randomPOI/'+minimalRank)
            .then(function (response) {
                var images = document.querySelectorAll("#quad img");
                images[0].src = response.data[0].image;
                images[1].src = response.data[1].image;
                images[2].src = response.data[2].image;
            })
            .catch(function (error) {
                console.log("dsa");
            });
    }]);
