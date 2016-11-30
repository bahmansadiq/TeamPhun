(function() {
    'use strict';

    angular
         .module('app', ['ui.router','toastr'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "app/partials/Home.html"
            })
             .state('home.Customer', {
                url: "/movieDetails/:movieDetailId",
                templateUrl: "app/partials/Customer.html",
                parent: "home",
                controller: 'TeamPhunController',
                controllerAs: 'vm'
            })
            .state('home.Vendor', {
                url: "/movieDetails/:movieDetailId",
                templateUrl: "app/partials/Vendor.html",
                parent: "home",
                controller: 'VendorController',
                controllerAs: 'vm'

            });
    });

})();