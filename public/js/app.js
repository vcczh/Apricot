var app = angular.module("apricotApp", ["ngRoute"]);

app.controller("homePageController", function($scope){
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

app.controller("profilePageController", function($scope){

});


app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "profile_inventory.html",
            controller: "profilePageController"
        })
        .when("/profile_post", {
            templateUrl: "profile_post.html",
            controller: "profilePageController"
        })
        .when("/profile_follower", {
            templateUrl: "profile_follower.html",
            controller: "profilePageController"

        })
        .when("/profile_following", {
            templateUrl: "profile_following.html",
            controller: "profilePageController"
        })
});

