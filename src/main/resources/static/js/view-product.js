angular.module('myApp').controller('viewProduct', function($scope, $rootScope, $cookies, productFactory, $routeParams, makeFactory, modelFactory) {

    let self = this;
    let id = $routeParams.id;
    self.product = {};

    productFactory.getById(id).then(function (response) {
        self.product = response.data;
    })

});