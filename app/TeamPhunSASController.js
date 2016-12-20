(function() {
    'use strict';
    angular
        .module('app')
        .controller('TeamPhunSASController', TeamPhunSASController);
    TeamPhunSASController.$inject = ['TeamPhunSASFactory', '$q', 'filterFilter', '$timeout'];
    /* @ngInject */
    function TeamPhunSASController(TeamPhunSASFactory, $q, filterFilter, $timeout) {
        var vm = this;
        vm.title = 'TeamPhunSASController';
        vm.getCategory = getCategory;
        vm.getSpecs = getSpecs;
        // vm.getProducts = getProducts;
        vm.findStyleByCatId = findStyleByCatId;
        vm.styleIdQtyCasePrice = [];
        vm.priceList = [];
        //  vm.styleDetails=[];
        vm.itemStyleByCatId = [];
        activate();
        ////////////////
        function activate() {
            // getProducts();
            getSpecs();
            getCategory();
        }

        function getCategory() {
            TeamPhunSASFactory.getCategory().then(function(response) {
                var array = response.data;
                var array2 = [];
                for (var i = 0, Sas = array.length; i < Sas; i++) {
                    // console.log(array[i]);
                    array2.push(array[i]);
                    // console.log(array2);
                }
                vm.data = array2;
            })
        }

        function getSpecs() {
            TeamPhunSASFactory.getSpecs().then(function(response) {
                vm.specs = response.data;
            })
        }

        function findStyleByCatId(categoryId) {
            activate();
            // 1. Get styles
            TeamPhunSASFactory.getStyleByCatId() //TODO: rename this to .getStyles as input is not required
                .then(function(response) {
                    // 2. Store styles in vm
                    vm.styleByCatId = response.data; // TODO: vm.styleByCatId can be renamed vm.styles
                    // 3. Only get styles for the given category
                    var filteredResult = filterFilter(vm.styleByCatId, { categories: categoryId });
                    // 4. Push each of those styles into the array
                    // 5. But also (and here's the clincher) - we need to get casePrice for each style.
                    for (var i = 0; i < filteredResult.length; i++) {
                        var style = {
                            brandName: filteredResult[i].brandName,
                            title: filteredResult[i].title,
                            styleImage: filteredResult[i].styleImage,
                            styleID: filteredResult[i].styleID,
                            casePrice: vm.productPrice
                        };
                        (function(style) {
                            $timeout(function() {
                                TeamPhunSASFactory
                                    .getProducts(style.styleID)
                                    .then(function(response) {
                                        var products = response.data;
                                        var set = [];
                                        products.forEach(function(p) {
                                            set.push(p.caseQty);
                                        })
                                        products.forEach(function(p) {
                                            set.push(p.casePrice);
                                        });
                                        style.averagePrice = set.reduce(function(x, y) {
                                            return x + y;
                                        }) / set.length;
                                    });
                            }, i * 1500);
                        })(style);
                        vm.itemStyleByCatId.push(style);
                    }
                })
            vm.styleIdQtyCasePrice = [];
        }
    }
})();
