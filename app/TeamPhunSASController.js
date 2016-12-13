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
        vm.getPriceByStyleId = getPriceByStyleId
        vm.styleIdQtyCasePrice = [];
        vm.priceList = [];





        //  vm.styleDetails=[];
        // var styles = [];

        // var stylesImg = [];


        //vm.categoryId=categoryId;

        activate();




        ////////////////
        /**/
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

        // function getProducts() {
        //     TeamPhunSASFactory.getProducts().then(function(response) {
        //         var findPrice = response.data;
        //         var styleId = response.data.styleID;
        //         var casePrice = response.data.casePrice;
        //         var quantity = response.data.qty;

        //         for (var i = 0; i < findPrice.length; i++) {
        //             var price = findPrice[i].styleId;
        //             //  console.log(priceArray[i]);
        //             vm.priceList.push(findPrice[i]);
        //             vm.styleIdQtyCasePrice.push(price);
        //             //console.log(priceArray2);
        //         }





        //         // console.log("its passing")

        //     })
        // }

        function findStyleByCatId(categoryId) {
            TeamPhunSASFactory.getStyleByCatId(categoryId).then(function(response) {
                vm.styleByCatId = response.data;

                var filteredResult = filterFilter(vm.styleByCatId, { categories: categoryId });
                vm.itemStyleByCatId = [];

                for (var i = 0; i < filteredResult.length; i++) {
                    var somethingObject= {brandName: filteredResult[i].brandName, title: filteredResult[i].title, styleImage: filteredResult[i].styleImage};
                    vm.itemStyleByCatId.push(somethingObject);
                    console.log(vm.itemStyleByCatId)
                }

                console.log(vm.itemStyleByCatId)
                    // var len = response.data;

                // //vm.test= response.data;
                // for (var j = 0; j < len.length; j++) {
                //     var item = len[j].categories.split(',');
                //     var style = len[j];
                //     var itemStyleId = len[j].styleID;

                //     for (var t = 0; t < item.length; t++) {

                //         if (item[t] == categoryId) {
                //             vm.itemStyleByCatId.push(style);

                //         };
                //         if (itemStyleId == style.styleID) {
                //             TeamPhunSASFactory.getProducts(style.styleID)
                //                 .then(function(result) {
                //                     vm.getStyleIdPrice = result.data;
                //                      vm.itemStyleByCatId[j].push(vm.getStyleIdPrice[j]);
                //                 });
                //         }


                //     }



                // }
            })

        }

        function getPriceByStyleId() {


        }

    }

})();
