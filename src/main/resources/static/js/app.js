angular.module('myApp', [ 'ngRoute', 'ngCookies', 'toastr', 'star-rating' ]).config(function($routeProvider, $locationProvider, toastrConfig) {

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
        .when('/basket', {
            templateUrl: 'view/basket.html',
            controller: 'basket',
            controllerAs: 'ctrl'
        })
        .when('/purchases', {
            templateUrl: 'view/purchases.html',
            controller: 'purchases',
            controllerAs: 'ctrl'
        })
        .when('/account', {
            templateUrl: 'view/account.html',
            controller: 'account',
            controllerAs: 'ctrl'
        })
        .otherwise('/');

    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: false,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });

});