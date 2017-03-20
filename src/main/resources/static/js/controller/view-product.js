angular.module('myApp').controller('viewProduct', function($scope, $rootScope, $cookies, $routeParams, productService) {

    let self = this;
    let id = $routeParams.id;
    self.product = {};

    productService.getById(id).then(function (response) {
        self.product = response.data;
    })

});