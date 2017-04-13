angular.module('myApp').controller('purchases', function($rootScope, $cookies, $location, toastr, customerService, basketItemService) {

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
        basketItemService.getPurchasedItems(user).then(function successCallback(response) {
            self.allBasketItems = response.data;
            self.basketItems = [];
            getTotal();
        });
    };

    let getTotal = function () {
        self.totalPrice = 0;

        angular.forEach(self.allBasketItems, function (value) {
            if(value.quantityPurchased > 0){
                self.basketItems.push(value);
                self.totalPrice += value.product.price * value.quantityPurchased;
            }
        });
    };

});