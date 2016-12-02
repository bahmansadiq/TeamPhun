(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeamPhunController', TeamPhunController);

    TeamPhunController.$inject = ['TeamPhunFactory'];

    /* @ngInject */
    function TeamPhunController(TeamPhunFactory) {
        var vm = this;
        vm.title = 'TeamPhunController';
        vm.addCustomer=addCustomer;
        vm.findCustomerById=findCustomerById;
        vm.allCustomers=[];
       vm.specificCustomer=[];
        var customerInfo={};



        activate();

        ////////////////

        function activate() {
            TeamPhunFactory.getCustomer()
            .then(function(response){
                     vm.allCustomers=response;
                     console.log(vm.allCustomers +"successfull loaded the customers from customer factor to the customer controller")
                     return response;
                },
                function(error){
                    console.log(error +"111  Unable to load the Custoers from the factory to the controller!");
                });        
        }
        function findCustomerById(id){
            TeamPhunFactory.getCustomerById(id)
            .then(function(response){
                    console.log(response);
                     vm.specificCustomer=response;
                     console.log(vm.specificCustomer);
                     console.log(vm.specificCustomer +"successfull loaded the specific customer from customer factor to the TeamPhun controller")
                     return response;
                },
                function(error){
                    console.log(error +" Unable to load the specific Customer from the factory to the controller!");
                });        
        }


        function addCustomer(){
             customerInfo={
                             FirstName: vm.firstName,
                             LastName: vm.lastName,
                             Organization: vm.organization,
                             WebSite: vm.webSite,
                             Role: vm.role,
                             BusinessPhone: vm.businessPhone,
                             MobilePhone: vm.mobilePhone,
                             OtherPhone: vm.otherPhone,
                             Fax: vm.fax,
                             Email: vm.email,
                             StreetAddress: vm.streetAddress,
                             City: vm.city,
                             State: vm.state,
                             ZipCode: vm.zipCode,
                             Country: vm.country,
                             Note: vm.note,
                             CustomerRecordCreated: new Date().toISOString() ,
                             UpdateCustomerRecord: new Date().toISOString() 
                        };


            TeamPhunFactory.postCustomer(customerInfo)
                       .then(function(response){
                        console.log("Successfully passed the new customer infromation from Cotnroller to TeamPhunFactory")
                return response;
                },
                function(error){
                 console.log(error +"123   Unable to passed the new customer infromation from Cotnroller to TeamPhunFactory!");
                return error;
                });

        }
console.log(vm.specificCustomer);

    }
})();	