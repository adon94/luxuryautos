angular.module('myApp').factory('basketItemService', function($http) {

    return {
        getByCustomer: function (customer) {
            return $http.post('/basketItem/customer', customer);
        },
        save: function (basketItem) {
            return $http.post('/basketItem/save', basketItem);
        },
        purchase: function (basketItems) {
            return $http.post('/basketItem/purchase', basketItems);
        }
    }

});