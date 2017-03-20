angular.module('myApp').controller('home', function($rootScope, $cookies, productService, makeService) {

    let self = this;
    self.makeNamesSelect = [];
    self.minPrice = 0;
    self.maxPrice = 5000000;

    productService.getAll().then(function (response) {
        self.products = response.data;
        angular.forEach(self.products, function (value, key) {
            //noinspection JSUnresolvedVariable
            self.products[key].makeName = value.make.name;
            console.log(self.products[key]);
        })
    });

    makeService.getAll().then(function (response) {
        self.makes = response.data;

        angular.forEach(self.makes, function (value) {
            self.makeNamesSelect.push(value.name);
        })
    });

});