angular.module('myApp').controller('viewProduct', function($scope, $rootScope, $cookies, $routeParams, toastr, productService, customerService) {

    let self = this;
    let id = $routeParams.id;
    let user = {};
    self.product = {};
    self.editable = false;

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
        user = $rootScope.currentUser;
    }

    productService.getById(id).then(function (response) {
        self.product = response.data;
    });

    self.addToBasket = function () {
        if (user != null) {
            user.basket.push(self.product);
            customerService.create(user).then(function successCallback(response) {
                $cookies.put('currentUser', JSON.stringify(response.data));
                $rootScope.currentUser = response.data;
                toastr.success(self.product.make.name + ' ' + self.product.model.name, 'Added to basket');
            }, function errorCallback() {
                toastr.error('An unknown error occurred', 'Error');
            })
        }
    };

    self.updateProduct = function () {
        productService.create(self.product).then(function (response) {
            toastr.success('Product updated');
            self.editable = false;
        });
    }

});