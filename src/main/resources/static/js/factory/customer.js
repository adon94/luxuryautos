angular.module('myApp').factory('customerService', function($http) {

    return {
        getAll: function () {
            return $http.get('/customer/all');
        },
        create: function (customer) {
            return $http.post('/customer/create', customer);
        },
        getById: function (id) {
            return $http.get('/customer/view/'+id);
        },
        login: function (customer) {
            return $http.post('/customer/login', customer);
        }
    }

});