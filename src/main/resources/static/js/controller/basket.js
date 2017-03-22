angular.module('myApp').controller('basket', function($rootScope, $cookies, $location, toastr, customerService) {

    let self = this;
    let user = {};

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
        user = $rootScope.currentUser;
    }

    let getTotal = function () {
        self.totalPrice = 0;

        angular.forEach(user.basket, function (value, key) {
            self.totalPrice += value.price;
            $rootScope.currentUser.basket[key].quantity = 1;
        });
    };

    getTotal();

    self.removeProduct = function (product) {
        let index = user.basket.indexOf(product);
        user.basket.splice(index, 1);
        customerService.create(user).then(function successCallback(response) {
            $cookies.put('currentUser', JSON.stringify(response.data));
            $rootScope.currentUser = response.data;
            user = $rootScope.currentUser;

            getTotal();
            toastr.info(product.make.name + ' '+ product.model.name,  'Removed from your basket:');
        }, function errorCallback() {
            toastr.error('An unknown error occurred', 'Error');
        })
    };

    self.confirmPurchase = function () {

        if(user.cardCvc != null && user.cardType != null && user.cardExpiry != null && user.cardNumber != null && user.address != null && user.name != null) {
            if (self.cvc == user.cardCvc) {
                angular.forEach(user.basket, function (value) {
                    user.purchased.push(value);
                });

                user.basket = [];

                customerService.create(user).then(function successCallback(response) {
                    $cookies.put('currentUser', JSON.stringify(response.data));
                    $rootScope.currentUser = response.data;
                    user = $rootScope.currentUser;

                    angular.element(document.querySelector('#purchaseModal')).modal('hide');
                    angular.element(document.querySelector('.modal-backdrop')).remove();

                    toastr.success('Order confirmed', 'Thank you for your purchase');
                    $location.path("/");
                }, function errorCallback(response) {
                    toastr.error('An unknown error occured', 'Error');
                });
            } else {
                toastr.error('Incorrect CVC', 'Error');
            }
        } else {
            toastr.info('<a href="#/account">Click here</a>', 'You must complete your account details to proceed', {
                allowHtml: true
            });
        }
    };

});