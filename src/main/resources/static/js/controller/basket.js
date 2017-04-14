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
        basketItemService.getBasketItems(user).then(function successCallback(response) {
            self.allBasketItems = response.data;
            console.log(self.allBasketItems);
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

        self.getShippingCosts();
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

        let purchase = new Purchase(user);
        let result = purchase.attempt();

        if(result == "success") {

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
            result;
        }
    };

    let Purchase = function (user) {
        this.user = user;
    };

    Purchase.prototype = {
        attempt: function () {
            let result = "success";
            if (!new CardDetails().verify(this.user)) {
                return toastr.info('<a href="#/account">Click here</a>',
                    'You must complete your card details to proceed', {
                    allowHtml: true
                });
            } else if (!new AddressCheck().verify(this.user)) {
                return toastr.info('<a href="#/account">Click here</a>',
                    'You must enter your shipping address to proceed', {
                        allowHtml: true
                    });
            } else if (!new CvcMatch().verify(this.user)) {
                return toastr.error('Incorrect CVC', 'Error');
            }
            return result;
        }
    };

    let CardDetails = function () {
        this.verify = function (user) {
            if (user.cardCvc != null || user.cardCvc != "" || user.cardType != null || user.cardType != ""
                || user.cardExpiry != null || user.cardExpiry != "" || user.cardNumber != null || user.cardNumber != "") {
                return true;
            } else {
                return false;
            }
        }
    };

    let CvcMatch = function () {
        this.verify = function (user) {
            return user.cardCvc == self.cvc;
        }
    };

    let AddressCheck = function () {
        this.verify = function (user) {
            return user.address != null || user.address != "";
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

    let Shipping = function () {
        this.shippingMethod = "";
    };

    Shipping.prototype = {
        setStrategy: function (shippingMethod) {
            this.shippingMethod = shippingMethod;
        },
        calculate: function (initialCost) {
            return self.shippingMethod.calculate(initialCost);
        }
    };

    self.NextDay = {
        calculate : function (initialCost) {
            return initialCost + (initialCost * 0.2);
        }
    };

    self.OneWeek = {
        calculate : function (initialCost) {
            return initialCost + (initialCost * 0.1);
        }
    };

    self.TwoWeeks = {
        calculate : function (initialCost) {
            return initialCost;
        }
    };

    self.shippingCosts = 0;
    self.shippingMethod = self.NextDay;

    self.getShippingCosts = function () {
        console.log("Getting shipping costs");
        let shipping = new Shipping();

        // let OneWeek = OneWeek();
        // let TwoWeeks = TwoWeeks();

        shipping.setStrategy(self.shippingMethod);

        self.shippingCosts = shipping.calculate(self.totalPrice);
    };

});