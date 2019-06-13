let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        .when('/', {
            template: '<h1>This is the default route</h1>'
        })
        .when('/about', {
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl',
        })
        .when('/login', {
            templateUrl: 'pages/logIn/logIn.html',
            controller : 'logInController as logInCtrl',
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl',
        })
        .when('/myAccount', {
            templateUrl: 'pages/myAccount/myAccount.html',
            controller : 'myAccountController as myAccountCtrl',
        })
        .otherwise({ redirectTo: '/' });
});
