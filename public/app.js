let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
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
        .when('/logout', {
            controller : 'logInController as logOutCtrl',
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl',
        })
        .when('/myAccount', {
            templateUrl: 'pages/myAccount/myAccount.html',
            controller : 'myAccountController as myAccountCtrl',
        })
        .when('/search', {
            templateUrl: 'pages/search/search.html',
            controller : 'searchController as searchCtrl',
        })
        .when('/showPOI', {
            templateUrl: 'pages/showPOI/showPOI.html',
            controller : 'showPOIController as showPOICtrl',
        })
        .when('/favorites', {
            templateUrl: 'pages/favorites/favorites.html',
            controller : 'favoritesController as favoritesCtrl',
        })
        .when('/restorePW', {
            templateUrl: 'pages/restorePassWord/restorePW.html',
            controller : 'restorePWController as restorePWCtrl',
        })
        .otherwise({ redirectTo: '/' });
});
