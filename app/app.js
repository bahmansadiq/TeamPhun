(function() {
    'use strict'

    angular.module('app', ['ui.router', 'toastr'])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home/teamPhun");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "app/partials/Home.html"
            })
            .state('home.teamPhun', {

                url: "/teamPhun",
                templateUrl: "app/partials/TeamPhun.html",
                parent: "home",
                controller: 'TeamPhunController',
                controllerAs: 'vm'
            })

        .state('home.customer', {

            url: "/customer",
            templateUrl: "app/partials/Customer.html",
            parent: "home",
            controller: 'TeamPhunController',
            controllerAs: 'vm'
        })

        // url: "/state2/:movieDetailId",

        .state('home.quoteGenerator', {
                url: "/quoteGenerator",
                templateUrl: "app/partials/OrderLineItem.html",
                parent: "home",
                controller: 'TeamPhunController',
                controllerAs: 'vm'
            })
            .state('home.test', {
                url: "/test",
                templateUrl: "app/partials/test.html",
                parent: "home",
                controller: 'TeamPhunSASController',
                controllerAs: 'vm'
            })
            .state('home.order', {
                url: "/order",
                templateUrl: "app/partials/Order.html",
                parent: "home",
                controller: 'TeamPhunController',
                controllerAs: 'vm'
            });


    });
    $(window).onbeforeunload = function() {
        localStorage.removeItem(price);
        localStorage.removeItem(colorId);
        localStorage.removeItem(quantityId);
        return '';
    };


})();
