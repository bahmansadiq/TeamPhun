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
        vm.findStyleByCatId= findStyleByCatId;
       

      //  vm.styleDetails=[];
        var styles=[];

        var stylesImg=[];

        
        //vm.categoryId=categoryId;

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

        function getProducts() {
            TeamPhunSASFactory.getProducts().then(function(response) {
                var priceArray = response.data;
                var priceArray2 = [];

                for (var i = 0, pr = priceArray.length; i < pr; i++) {
                    //  console.log(priceArray[i]);
                    priceArray2.push(priceArray[i].styleImage);
                      //console.log(priceArray2);
                  }

                  vm.Products = priceArray2;


                  for(var j = 0, img=priceArray2.length; j<img; j++){
                    vm.image = priceArray2;
                }

                // console.log("its passing")

            })
        }

        function findStyleByCatId(categoryId){
            TeamPhunSASFactory.getStyleByCatId(categoryId).then(function(response){
                var len= response.data.length;
                vm.test= response;
                for(var j=0; j< len; j++){
                    styles.push(response.data[j].brandName);

                }

                vm.styleDetails = styles;

                //  for(var j=0; j< len; j++){
                //     stylesImg.push(response.data[j].brandName);

                // }

                // vm.styleImg=stylesImg;

                styles=[];

                // $filter('filter')(vm.test, categories, vm.categoryId)

            })
        }

        

    
}
})();
