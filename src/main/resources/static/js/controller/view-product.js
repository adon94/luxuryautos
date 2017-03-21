angular.module('myApp').controller('viewProduct', function($scope, $rootScope, $cookies, $routeParams, productService) {

    let self = this;
    let id = $routeParams.id;
    self.product = {};

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
    }

    productService.getById(id).then(function (response) {
        self.product = response.data;
    })

});