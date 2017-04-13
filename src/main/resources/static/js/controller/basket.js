angular.module('myApp').controller('basket', function($rootScope, $cookies, $location, toastr, customerService, basketItemService) {

    //TO DO:
    //       Purchase history page
    //       Reviews

    let self = this;
    let user = {};

    let userId = $cookies.get('currentUser');
    if(userId != null) {
        customerService.getById(userId).then(function successCallback(response) {
            $rootScope.currentUser = response.data;
            user = $rootScope.currentUser;

            getBasketItems();
        });
    }

    let getBasketItems = function () {
        basketItemService.getByCustomer(user).then(function successCallback(response) {
            self.allBasketItems = response.data;
            self.basketItems = [];
            getTotal();
        });
    };

    let getTotal = function () {
        self.totalPrice = 0;

        angular.forEach(self.allBasketItems, function (value) {
            if(value.quantity > 0){
                self.basketItems.push(value);
                self.totalPrice += value.product.price * value.quantity;
            }
        });
    };

    self.removeProduct = function (basket) {

        let basketItem = {};
        basketItem.customer = user;
        basketItem.product = basket.product;
        basketItem.quantity = -Math.abs(basket.quantity);
        console.log(basketItem.quantity);

        basketItemService.save(basketItem).then(function successCallback(response) {
            getBasketItems();
            toastr.info(basket.product.make.name + ' '+ basket.product.model.name,  'Removed from your basket:');
        }, function errorCallback() {
            toastr.error('An unknown error occurred', 'Error');
        })
    };

    self.confirmPurchase = function () {

        if(user.cardCvc != null && user.cardType != null && user.cardExpiry != null && user.cardNumber != null && user.address != null && user.name != null) {
            if (self.cvc == user.cardCvc) {

                basketItemService.purchase(self.basketItems).then(function successCallback(response) {

                    angular.element(document.querySelector('#purchaseModal')).modal('hide');
                    angular.element(document.querySelector('.modal-backdrop')).remove();

                    toastr.success('Order confirmed', 'Thank you for your purchase');
                    $location.path("/");
                }, function errorCallback(response) {
                    if (response.status == 409){
                        angular.forEach(response.data, function (value) {
                            toastr.warning('Order quantity too high for ' + value.product.make.name + ' ' + value.product.model.name, 'Please review your order');
                        });
                    } else {
                        toastr.error('An unknown error occured', 'Error');
                    }
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

    self.addToBasket = function (basket) {
        if (user != null) {
            let basketItem = {};
            basketItem.customer = user;
            basketItem.product = basket.product;
            basketItem.quantity = 1;

            basketItemService.save(basketItem).then(function successCallback(response) {
                getBasketItems();
                toastr.success(basket.product.make.name + ' ' + basket.product.model.name + ' added');
            }, function errorCallback() {
                toastr.error('An unknown error occurred', 'Error');
            })
        }
    };

    self.takeFromBasket = function (basket) {
        if (user != null) {

            if (basket.quantity > 1) {

                let basketItem = {};
                basketItem.customer = user;
                basketItem.product = basket.product;
                basketItem.quantity = -1;

                basketItemService.save(basketItem).then(function successCallback(response) {
                    getBasketItems();
                    toastr.success(basket.product.make.name + ' ' + basket.product.model.name + ' removed');
                }, function errorCallback() {
                    toastr.error('An unknown error occurred', 'Error');
                })

            }
        }
    };

});