(function() {
    'use strict';
    angular
        .module('app')
        .controller('TeamPhunSASController', TeamPhunSASController);
    TeamPhunSASController.$inject = ['TeamPhunSASFactory', '$q'];
    /* @ngInject */
    function TeamPhunSASController(TeamPhunSASFactory, $q) {
        var vm = this;
        vm.title = 'TeamPhunSASController';
        vm.getSpecs = getSpecs;
        vm.getProducts = getProducts;
        activate();
        getSpecs();
        getProducts();
        ////////////////
        /**/
        function activate() {
            TeamPhunSASFactory.getCategory().then(function(response) {
                var array = response.data;
                var array2 = [];
                for (var i = 0, Sas = array.length; i < Sas; i++) {
                    // console.log(array[i]);
                    array2.push(array[i].name);
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

        function getProducts() {
            TeamPhunSASFactory.getProducts().then(function(response) {
                var priceArray = response.data;
                var priceArray2 = [];
                for (var i = 0, pr = priceArray.length; i < pr; i++) {
                    //  console.log(priceArray[i]);
                    priceArray2.push(priceArray[i].piecePrice);
                    //  console.log(priceArray2);
                }
                vm.Products = priceArray2;
                // console.log("its passing")
            })
        }
    }
})();
