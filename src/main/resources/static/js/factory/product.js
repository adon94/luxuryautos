angular.module('myApp').factory('productFactory', function($http, $rootScope) {

    return {
        getAll: function () {
            return $http.get('/product/all');
        },
        create: function (product) {
            return $http.post('/product/create', product);
        },
        getById: function (id) {
            return $http.get('/product/view/'+id);
        }
    }

});