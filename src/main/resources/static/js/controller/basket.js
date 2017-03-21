angular.module('myApp').controller('basket', function($rootScope, $cookies, $location, toastr, customerService) {

    let self = this;
    let user = {};

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
        user = $rootScope.currentUser;
    }

    self.totalPrice = 0;

    angular.forEach(user.basket, function (value, key) {
        self.totalPrice += value.price;
        $rootScope.currentUser.basket[key].quantity = 1;
    })

});