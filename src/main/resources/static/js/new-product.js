angular.module('myApp').controller('newProduct', function($scope, $rootScope, $cookies, $location, productFactory, makeFactory, modelFactory) {

    let self = this;
    self.product = {};
    self.newMake = {};
    self.newModel = {};
    self.makeForModel = {};

    self.refresh = function () {
        makeFactory.getAll().then(function (response) {
            self.makes = response.data;
        });
        modelFactory.getAll().then(function (response) {
            self.models = response.data;
        });
    };

    self.refresh();

    self.createProduct = function () {
        if(self.product.price != null && self.product.color != null) {
            productFactory.create(self.product).then(function (response) {
                if (response.status = 200) {
                    $location.path("/");
                }
            });
        }
    };

    self.addMake = function () {
        makeFactory.create(self.newMake).then(function (response) {
            console.log(response.status);
            self.refresh();
            angular.element( document.querySelector( '#makeModal' )).modal('toggle');
        });
    };

    self.addModel = function () {
        if (self.makeForModel != {}) {
            self.makeForModel.models.push(self.newModel);

            makeFactory.create(self.makeForModel).then(function (response) {
                console.log(response.status);
                angular.element(document.querySelector('#modelModal')).modal('toggle');
                self.refresh();
            });
        }
    };

});