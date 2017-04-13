angular.module('myApp').factory('basketItemService', function($http) {

    return {
        getBasketItems: function (customer) {
            return $http.post('/basketItem/all/'+false, customer);
        },
        getPurchasedItems: function (customer) {
            return $http.post('/basketItem/all/'+true, customer);
        },
        save: function (basketItem) {
            return $http.post('/basketItem/save', basketItem);
        },
        purchase: function (basketItems) {
            return $http.post('/basketItem/purchase', basketItems);
        }
    }

});