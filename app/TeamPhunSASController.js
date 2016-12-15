(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeamPhunSASController', TeamPhunSASController);

    TeamPhunSASController.$inject = ['TeamPhunSASFactory', '$q', 'filterFilter'];

    /* @ngInject */
    function TeamPhunSASController(TeamPhunSASFactory, $q, filterFilter) {
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
            TeamPhunSASFactory.getStyleByCatId(categoryId)
                .then(function(response) {
                    vm.styleByCatId = response.data;

                    var filteredResult = filterFilter(vm.styleByCatId, { categories: categoryId });

                    //var productPrice=[];
                    for (var i = 0; i < filteredResult.length; i++) {
                        var somethingObject = {
                            brandName: filteredResult[i].brandName,
                            title: filteredResult[i].title,
                            styleImage: filteredResult[i].styleImage,
                            styleID: filteredResult[i].styleID,
                            casePrice: vm.productPrice
                        };
                        vm.itemStyleByCatId.push(somethingObject);
                        

                    }

                    TeamPhunSASFactory.getProducts(somethingObject.styleID)
                        .then(function(result) {
                            console.log("this is my result" + result.data);
                            vm.productData = result.data; //it contains all the caseprice and quantity for each style

//iterate throught the array to get specific data we need
                            for (var a = 0; a < vm.productData.length; a++) {
                                var loopForAllStyleData = vm.productData[a];
                                var loopForStyleId = vm.productData[a].styleID;
                                var loopForCasePrice = vm.productData[a].casePrice;
                                var loopForQty = vm.productData[a].qty;
                                var loopForcaseQty = vm.productData[a].caseQty;
                            }


                            for (var t = 0; t < vm.itemStyleByCatId.length; t++) {
                                var matchStyleId = vm.itemStyleByCatId[t];

                                if (matchStyleId.styleID == loopForStyleId) {
                                    vm.styleObject={ caseQty: loopForcaseQty, casePrice: loopForCasePrice, qty: loopForQty, brandName: matchStyleId.brandName, title: matchStyleId.title, styleImage: matchStyleId.styleImage };

                                }


                                // var filteredCasePriceByStyleId = filterFilter(matchStyleId, { styleID: loopForStyleId });
                            }
                            console.log(vm.styleIdQtyCasePrice);
                            vm.styleIdQtyCasePrice.push(vm.styleObject);


                        })

                })
vm.styleIdQtyCasePrice=[];

        }
    }


})();
