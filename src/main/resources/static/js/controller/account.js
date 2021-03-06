angular.module('myApp').controller('account', function($rootScope, $cookies, $location, toastr, customerService) {

    let self = this;
    self.user = {};

    // angular.element(document.querySelector('#purchaseModal')).modal('hide');
    angular.element(document.querySelector('.modal-backdrop')).remove();

    let userId = $cookies.get('currentUser');
    if(userId != null) {
        customerService.getById(userId).then(function successCallback(response) {
            $rootScope.currentUser = response.data;
            self.user = $rootScope.currentUser;
        });
    }

    self.editName = false;
    self.editEmail = false;
    self.editPassword = false;
    self.editAddress = false;
    self.editCardType = false;
    self.editCardNumber = false;
    self.editCardExpiry = false;
    self.editCardCvc = false;

    self.updateUser = function () {
        customerService.create(self.user).then(function successCallback(response) {
            $cookies.put('currentUser', response.data.id);
            $rootScope.currentUser = response.data;
            self.user = $rootScope.currentUser;
            toastr.success('User details updated');
        })
    }

});