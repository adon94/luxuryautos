angular.module('myApp').factory('modelService', function($http) {

    return {
        getAll: function () {
            return $http.get('/model/all');
        },
        create: function (model) {
            return $http.post('/model/create', model);
        },
        getById: function (id) {
            return $http.get('/model/view/'+id);
        }
    }

});