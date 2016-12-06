(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeamPhunController', TeamPhunController);

    TeamPhunController.$inject = ['TeamPhunFactory', 'toastr'];

    /* @ngInject */
    function TeamPhunController(TeamPhunFactory, toastr) {
        var vm = this;
        vm.title = 'TeamPhunController';
        vm.addCustomer = addCustomer;
        vm.removeCustomer = removeCustomer;
        vm.findCustomerById = findCustomerById;
        vm.updateCustomer = updateCustomer;
        vm.allCustomers = [];
        vm.specificCustomer = [];
        var customerInfo = {};

        // Slider for profit margin on orderLineItem.html
        $("#ex6").slider();
        $("#ex6").on("slide", function(slideEvt) {
            $("#ex6SliderVal").text(slideEvt.value);
        });


        activate();

        ////////////////

        function activate() {
            TeamPhunFactory.getCustomer()
                .then(function(response) {
                        vm.allCustomers = response;
                        console.log(vm.allCustomers + "successfull loaded the customers from customer factor to the customer controller")

                        return response;
                    },
                    function(error) {
                        console.log(error + "111  Unable to load the Custoers from the factory to the controller!");
                    });
        }

        function findCustomerById(id) {
            TeamPhunFactory.getCustomerById(id)
                .then(function(response) {
                        //console.log(response);
                        vm.specificCustomer = response;
                        console.log(vm.specificCustomer);
                        console.log(vm.specificCustomer + "successfull loaded the specific customer from customer factor to the TeamPhun controller")
                        return response;
                    },
                    function(error) {
                        console.log(error + " Unable to load the specific Customer from the factory to the controller!");
                    });
        }


        function addCustomer() {

            customerInfo = {
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
                CustomerRecordCreated: new Date().toISOString(),
                UpdateCustomerRecord: new Date().toISOString()
            };
            if (vm.customerId) {
                customerInfo.customerId = vm.customerId;
                updateCustomer(vm.customerId, customerInfo);
                toastr.success("The Customer records with ID: " + vm.customerId + " has been successfully updated");

            } else {
                TeamPhunFactory.postCustomer(customerInfo)
                    .then(function(response) {
                            toastr.success("Successfully added " + customerInfo.FirstName + "  " + customerInfo.LastName + " to the customers list!");
                            //   console.log("Successfully passed the new customer infromation from Cotnroller to TeamPhunFactory")
                            vm.firstName = "";
                            vm.lastName = "";
                            vm.organization = "";
                            vm.webSite = "";
                            vm.role = "";
                            vm.businessPhone = "";
                            vm.mobilePhone = "";
                            vm.otherPhone = "";
                            vm.fax = "";
                            vm.email = "";
                            vm.streetAddress = "";
                            vm.state = "";
                            vm.zipCode = "";
                            vm.city = "";
                            vm.country = "";
                            vm.note = "";

                            return response;
                        },
                        function(error) {
                            console.log(error + "Unable to passed the new customer infromation from Cotnroller to TeamPhunFactory!");
                            return error;
                        });

            }

        }

        // is responsible to make all the fields edite able in the customerDetail page right away.
        //It's associated with edit button in Customer Detail page.
        vm.populateEditForm = function(customer) {

                vm.firstName = customer.firstName;
                vm.lastName = customer.lastName;
                vm.organization = customer.organization;
                vm.webSite = customer.webSite;
                vm.role = customer.role;
                vm.businessPhone = customer.businessPhone;
                vm.mobilePhone = customer.mobilePhone;
                vm.otherPhone = customer.otherPhone;
                vm.fax = customer.fax;
                vm.email = customer.email;
                vm.streetAddress = customer.streetAddress;
                vm.state = customer.state;
                vm.zipCode = customer.zipCode;
                vm.city = customer.city;
                vm.country = customer.country;
                vm.note = customer.note;
            }
            // this function has been called by ----- button in after updating
        function updateCustomer(id, customerdata) {
            TeamPhunFactory.pullCustomer(id, customerdata)
                .then(function(response) {
                    toastr.success("successfully updated " + id + " from the controller to the factory!");
                }, function(error) {
                    toastr.error("Unable to successfully updated " + id + " from the controller to the factory!");
                })
        }

        function removeCustomer(id) {
            TeamPhunFactory.deleteCustomer(id)
                .then(function(response) {
                        //console.log(response);
                        console.log("successfully sent the deleted request for the specific customer from customer controller to the TeamPhun factory")
                        activate();
                        return response;
                    },
                    function(error) {
                        console.log(error + "Unable to successfully send the deleted request for the specific customer from customer controller to the TeamPhun factory");
                    });
        }

    }
})();
