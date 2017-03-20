angular.module('myApp').controller('home', function($rootScope, $cookies, productFactory, makeFactory, modelFactory) {

    let self = this;
    self.makeNamesSelect = [];
    self.minPrice = 0;
    self.maxPrice = 5000000;

    productFactory.getAll().then(function (response) {
        self.products = response.data;
        angular.forEach(self.products, function (value, key) {
            self.products[key].makeName = value.make.name;
            console.log(self.products[key]);
        })
    });

    makeFactory.getAll().then(function (response) {
        self.makes = response.data;

        angular.forEach(self.makes, function (value, key) {
            self.makeNamesSelect.push(value.name);
        })
    });

    // self.matchAmount = function(product){
    //     console.log("Filtering");
    //     console.log(product.price);
    //     return product.price >= self.minPrice && product.price <= self.maxPrice;
    // }
});