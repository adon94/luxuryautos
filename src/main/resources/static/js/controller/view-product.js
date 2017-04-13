angular.module('myApp').controller('viewProduct', function($scope, $rootScope, $cookies, $routeParams, toastr, productService, customerService, basketItemService) {

    let self = this;
    let id = $routeParams.id;
    let user = {};
    self.product = {};
    self.editable = false;
    self.review = {};
    self.averageRating = 0;

    let userId = $cookies.get('currentUser');
    if(userId != null) {
        customerService.getById(userId).then(function successCallback(response) {
            $rootScope.currentUser = response.data;
            user = $rootScope.currentUser;
        });
    }

    productService.getById(id).then(function (response) {
        self.product = response.data;
        getAverageRating();
    });

    let getAverageRating = function () {
        if (self.product.reviews.length > 0) {
            console.log("In avg ratings");
            let ratingTotal = 0;
            angular.forEach(self.product.reviews, function (value) {
                ratingTotal += value.rating;
                console.log(value.rating);
            });
            console.log(ratingTotal);
            self.averageRating = ratingTotal / self.product.reviews.length;
        }
    };

    self.addToBasket = function () {
        if (user != null) {
            let basketItem = {};
            basketItem.customer = user;
            basketItem.product = self.product;
            basketItem.quantity = 1;

            basketItemService.save(basketItem).then(function successCallback(response) {
                toastr.success(self.product.make.name + ' ' + self.product.model.name, 'Added to basket');
            }, function errorCallback() {
                toastr.error('An unknown error occurred', 'Error');
            })
        }
    };

    self.updateProduct = function () {
        productService.create(self.product).then(function (response) {
            toastr.success('Product updated');
            self.editable = false;
        });
    };

    self.postReview = function () {
        if(user != null) {
            if (self.review.rating != 0 && self.review.description != null) {
                self.review.customer = user;
                self.product.reviews.push(self.review);
                productService.create(self.product).then(function successCallback(response) {
                    self.review.rating = null;
                    self.review.description = null;
                    self.product = response.data;
                    getAverageRating();
                    toastr.success('Review submitted');
                }, function errorCallback(response) {
                    toastr.error('An unknown error occurred', 'Error');
                })
            } else {
                toastr.warning('Please finish the review before posting');
            }
        } else {
            toastr.warning('Please login to leave a review');
        }
    };

    self.onRatingChange = function($event) {
        self.review.rating = $event.rating;
    }

});