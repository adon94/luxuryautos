angular.module('myApp', [ 'ngRoute', 'ngCookies' ]).config(function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'view/home.html',
            controller: 'home',
            controllerAs: 'ctrl'
        })
        .when('/new', {
            templateUrl: 'view/new-product.html',
            controller: 'newProduct',
            controllerAs: 'ctrl'
        })
        .when('/product/:id', {
            templateUrl: 'view/view-product.html',
            controller: 'viewProduct',
            controllerAs: 'ctrl'
        })
        .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'login',
            controllerAs: 'ctrl'
        })
        .otherwise('/');
});