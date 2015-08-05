var app = angular.module("apricotApp", ["ngRoute", "ui.router"]);

app.controller("feedsController", function ($scope){

    // $http.get('/api/feeds')
    // .success(function (data) {
    //     $scope.feeds = data;
    // })
    // .error(function () {

    // });

    // $http.get('/api/user/:id')
    // .success(function (data) {
    //     $scope.user = data;
    // })
    // .error(function () {

    // });

    // $http.get('/api/statistics')
    // .success(function (data) {
    //     $scope.statistics = data;
    // })
    // .error(function () {

    // });


    
    $scope.user = {
        id: 1,
        user_pic: "img/user-pic2.jpg",
        name: "Ziqiang Shi"
    };
    $scope.statistics = {
        sell: 10,
        post: 8,
        inventory: 12,
        following: 8,
        follower: 11
    };
    $scope.feeds = [
        {
            name: "Ziqiang Shi",
            date: "July 7th",
            title: "my lamborghini",
            description: "This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell",
            values: 10000,
            nBuyers: 10
        },
        {
            name: "Ziqiang Shi",
            date: "July 7th",
            title: "my lamborghini",
            description: "This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell",
            values: 10000,
            nBuyers: 10
        }
    ];
});

app.controller("profileController", function ($scope) {
    // $http.get('/api/user/:id')
    // .success(function (data) {
    //     $scope.user = data;
    // })
    // .error(function () {

    // });
    // $http.get('/api/statistics')
    // .success(function (data) {
    //     $scope.user = data;
    // })
    // .error(function () {

    // });

    $scope.user = {
        id: 1,
        user_pic: "img/user-pic2.jpg",
        name: "Ziqiang Shi",
        signature: "What doesn't kill you make you stronger",
        address: 'UCLA, Los Angeles',
        join_date: 'December 2010'
    };

    $scope.statistics = {
        sell: 10,
        post: 8,
        inventory: 12,
        following: 8,
        follower: 11
    };
});

app.controller("inventoryController", function ($scope) {
    // $http.get('/api/inventory')
    //     .success(function (data) {
    //         $scope.inventory = data;
    //     })
    //     .error(function () {

    //     }
    // );

    $scope.inventory = [
    {
        status: 'sold',
        transcation_user_id: 1,
        transaction_user_pic: 'img/user-pic1.jpg',
        date: 'July 6',
        title: 'my lamborghini',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 1000,
        pic: 'img/post-pic.jpg'
    },
    {
        status: 'onsell',
        transcation_user_id: 1,
        transaction_user_pic: 'img/user-pic1.jpg',
        date: 'July 6',
        title: 'my lamborghini',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 2000,
        pic: 'img/post-pic.jpg'
    },
    {
        status: 'inventory',
        transcation_user_id: 1,
        transaction_user_pic: 'img/user-pic1.jpg',
        date: 'July 6',
        title: 'my lamborghini',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 1000,
        pic: 'img/post-pic.jpg'
    },
    {
        status: 'bought',
        transcation_user_id: 1,
        transaction_user_pic: 'img/user-pic1.jpg',
        date: 'July 6',
        title: 'my lamborghini',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 1000,
        pic: 'img/post-pic.jpg'
    }
    ];
});

app.controller("postController", function ($scope) {
    // $http.get('/api/posts')
    // .success(function (data) {
    //     $scope.posts = data;
    // })
    // .error(function () {

    // }); 
    $scope.posts = [
    {
        post_user_pic: 'mg/user-pic2.jpg',
        transaction_user_pic: 'img/user-pic1.jpg',
        status: 'sold',
        post_user_name: 'Ziqiang Shi',
        post_date: 'July 7',
        title: 'my lamborghini',
        post_pic: 'img/post-pic.jpg',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 1000
    },
    {
        post_user_pic: 'mg/user-pic2.jpg',
        transaction_user_pic: 'img/user-pic1.jpg',
        status: 'onsell',
        post_user_name: 'Ziqiang Shi',
        post_date: 'July 7',
        title: 'my lamborghini',
        post_pic: 'img/post-pic.jpg',
        description: 'This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell.This is the description of the sell',
        value: 1000
    },
    ];
});

app.controller("followerController", function ($scope) {
    // $http.get('/api/followers')
    // .success(function (data) {
    //     $scope.followers = data;
    // })
    // .error(function () {

    // });
    $scope.followers = [
        {
            profileImg: "img/user-pic1.jpg",
            url: "",
            name: "ziqiang Shi",
            followerBy: 25
        },
        {
            profileImg: "img/user-pic2.jpg",
            url: "",
            name: "Jimmy",
            followerBy: 20
        },
    ];
});

app.controller("followingController", function ($scope) {
    // $http.get('/api/followings')
    // .success(function (data) {
    //     $scope.followings = data;
    // })
    // .error(function () {

    // });
    $scope.followings = [
        {
            profileImg: "img/user-pic1.jpg",
            url: "",
            name: "ziqiang Shi",
            followerBy: 25
        },
        {
            profileImg: "img/user-pic2.jpg",
            url: "",
            name: "Jimmy",
            followerBy: 20
        },
        {
            profileImg: "img/user-pic1.jpg",
            url: "",
            name: "ziqiang Shi",
            followerBy: 25
        }
    ];

});


app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $urlRouterProvider.when("/profile", "/profile/inventory");
    $stateProvider
        .state("feeds", {
            url: "/",
            templateUrl: "feeds.html",
            controller: "feedsController"
        })
        .state("profile", {
            url: "/profile",
            templateUrl: "profile.html",
            controller: "profileController"
        })
        .state("profile.inventory", {
            url: "/inventory",
            templateUrl: "profile.inventory.html",
            controller: "inventoryController"
        })
        .state("profile.post", {
            url: "/post",
            templateUrl: "profile.post.html",
            controller: "postController"
        })
        .state("profile.follower", {
            url: "/follower",
            templateUrl: "profile.follower.html",
            controller: "followerController"
        })
        .state("profile.following", {
            url: "/following",
            templateUrl: "profile.following.html",
            controller: "followingController"
        });
});
