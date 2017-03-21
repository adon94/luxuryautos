angular.module('myApp').controller('home', function($rootScope, $cookies, toastr, productService, makeService, customerService) {

    let self = this;
    self.makeNamesSelect = [];
    self.minPrice = 0;
    self.maxPrice = 5000000;
    let user = {};

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
        user = $rootScope.currentUser;
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
            user.basket.push(product);
            customerService.create(user).then(function successCallback(response) {
                $cookies.put('currentUser', JSON.stringify(response.data));
                $rootScope.currentUser = response.data;
                toastr.success(product.make.name + ' ' + product.model.name, 'Added to basket');
            }, function errorCallback() {
                toastr.error('An unknown error occurred', 'Error');
            })
        }
    }
});