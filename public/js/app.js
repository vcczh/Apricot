var app = angular.module("apricotApp", ["ngRoute"]);

app.controller("homepageController", function ($scope){
    $scope.posts = [
        {
            name: "Ziqiang Shi",
            time: "July 7th",
            title: "my lamborghini",
            description: "This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell",
            values: 10000,
            nBuyers: 10
        },
        {
            name: "Ziqiang Shi",
            time: "July 7th",
            title: "my lamborghini",
            description: "This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell",
            values: 10000,
            nBuyers: 10
        }

    ];
});

app.controller("profilePageController", function ($scope){

});



app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home_page.html",
            controller: "homepageController"
        })
        .when("/profile", {
            templateUrl: "profile_post.html",
            controller: "profileController"
        });
});
