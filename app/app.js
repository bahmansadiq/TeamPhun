(function() {
    'use strict';

    angular.module('app', ['ui.router','toastr'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "app/partials/Home.html"
            })
             .state('home.customer', {
                url: "/customer",
                templateUrl: "app/partials/Customer.html",
                parent: "home",
                controller: 'TeamPhunSASController',
                controllerAs: 'vm'
            })
               .state('home.quoteGenerator', {
                url: "/quoteGenerator",
                templateUrl: "app/partials/OrderLineItem.html",
                parent: "home",
                controller: 'TeamPhunController',
                controllerAs: 'vm'

            })
               .state('home.order', {
                url: "/order",
                templateUrl: "app/partials/Order.html",
                parent: "home",
                controller: 'TeamPhunSASController',
                controllerAs: 'vm'

            })
               .state('home.vendor', {
                url: "/vendor",
                templateUrl: "app/partials/Vendor.html",
                parent: "home",
                controller: 'TeamPhunSASController',
                controllerAs: 'vm'
            });
    });

})();