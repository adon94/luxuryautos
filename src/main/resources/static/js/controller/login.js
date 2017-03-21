angular.module('myApp').controller('login', function($rootScope, $cookies, $location, toastr, customerService) {

    let self = this;
    self.user = {};
    self.new = {};

    let userString = $cookies.get('currentUser');
    if(userString != null) {
        $rootScope.currentUser = JSON.parse(userString);
    }

    self.createUser = function () {
        if(self.new.password == self.newPassword2 && self.new.email != null && self.new.name != null) {
            self.new.admin = false;
            customerService.create(self.new).then(function (response) {
                if(response.status == 200) {
                    $cookies.put('currentUser', JSON.stringify(response.data));
                    $rootScope.currentUser = response.data;
                    $location.path("/");
                }
            })
        }
    };

    self.login = function () {
        if(self.user.password != null && self.user.email != null) {
            customerService.login(self.user).then(function successCallback(response) {
                $cookies.put('currentUser', JSON.stringify(response.data));
                $rootScope.currentUser = response.data;
                $location.path("/");
                toastr.success('Logged in as ' + response.data.name, 'Welcome back');
            }, function errorCallback(response) {
                if(response.status == 401) {
                    toastr.error('Incorrect email or password', 'Error');
                } else if (response.status = 404) {
                    toastr.error('User not found', 'Error');
                } else {
                    toastr.error('An unexpected error occurred', 'Error');
                }
            })
        }
    };
});