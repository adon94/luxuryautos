angular.module('myApp').factory('makeService', function($http) {

    return {
        getAll: function () {
            return $http.get('/make/all');
        },
        create: function (make) {
            return $http.post('/make/create', make);
        },
        getById: function (id) {
            return $http.get('/make/view/'+id);
        }
    }

});