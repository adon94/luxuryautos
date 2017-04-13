angular.module('myApp').controller('home', function($rootScope, $cookies, toastr, productService, makeService, customerService, basketItemService) {

    let self = this;
    self.makeNamesSelect = [];
    self.minPrice = 0;
    self.maxPrice = 5000000;
    let user = {};

    let userId = $cookies.get('currentUser');
    if(userId != null) {
        customerService.getById(userId).then(function successCallback(response) {
            $rootScope.currentUser = response.data;
            user = $rootScope.currentUser;
        });
    }

    productService.getAll().then(function (response) {
        self.products = response.data;
        angular.forEach(self.products, function (value, key) {
            self.products[key].makeName = value.make.name;
        })
    });

    makeService.getAll().then(function (response) {
        self.makes = response.data;

        angular.forEach(self.makes, function (value) {
            self.makeNamesSelect.push(value.name);
        })
    });

    self.addToBasket = function (product) {
        if (user != null) {
            let basketItem = {};
            basketItem.customer = user;
            basketItem.product = product;
            basketItem.quantity = 1;

            basketItemService.save(basketItem).then(function successCallback(response) {
                toastr.success(product.make.name + ' ' + product.model.name, 'Added to basket');
            }, function errorCallback() {
                toastr.error('An unknown error occurred', 'Error');
            })
        }
    }
});