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
        vm.addOrder = addOrder;
        vm.updateOrder = updateOrder;
        vm.removeCustomer = removeCustomer;
        vm.findCustomerById = findCustomerById;
        vm.updateCustomer = updateCustomer;
        vm.addOrderLineItem = addOrderLineItem;
        vm.populateOrderForm = populateOrderForm;
        vm.removeOrder = removeOrder;
        vm.findColorTier = findColorTier;
        vm.findQuantityTier = findQuantityTier;
        vm.findColorQuantityPrice = findColorQuantityPrice;
        vm.allCustomers = [];
        vm.removeOrder = removeOrder;
        vm.allCustomers = [];
        vm.specificCustomer = [];
        vm.allOrders = [];
        vm.allPrices = [];
        vm.allcolors = [];
        vm.allOrderLineItems = [];
        vm.colorId = [];
        vm.quantityId = [];
        vm.price = [];


        activate();


        ////////////////

        function activate() {
            findCustomers();
            findOrders();
            findOrdersLineItems();

            //findColorTier(vm.TotalNumberColors);
            // findQuantityTier(vm.TotalPieces);
            // findColorQuantityPrice(1,2);
        }

        function findCustomers() {
            TeamPhunFactory.getCustomer()
                .then(function(response) {

                        vm.allCustomers = response;
                        return vm.allCustomers;
                    },
                    function(error) {
                        console.log(error + "Unable to load the Custoers from the factory to the controller!");
                    });
        }

        function findCustomerById(id) {
            TeamPhunFactory.getCustomerById(id)
                .then(function(response) {
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

            var customerInfo = {
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

                customerInfo.CustomerId = vm.customerId;
                updateCustomer(vm.customerId, customerInfo);
                toastr.success(customerInfo.FirstName + " " + customerInfo.LastName + " has been successfully updated");

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


            } else {

                TeamPhunFactory.postCustomer(customerInfo)
                    .then(function(response) {

                            toastr.success("Successfully added " + customerInfo.FirstName + "  " + customerInfo.LastName + " to the customers list!");
                            return response;
                        },
                        function(error) {
                            console.log(error + "Unable to passed the new customer infromation from Cotnroller to TeamPhunFactory!");
                            return error;
                        });
            }

        }
        // is responsible to make all the fields edit able in the customerDetail page right away.
        //It's associated with edit button in Customer Detail page.
        vm.populateEditForm = function(customer) {

            vm.customerId = customer.customerId;
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
            TeamPhunFactory.putCustomer(id, customerdata)
                .then(function(response) {
                    // vm.editCustomer = !vm.editCustomer;

                    toastr.success("successfully updated " + id + " from the controller to the factory!");
                    return response;

                }, function(error) {

                    console.log(error + "this is the correct error message");
                });
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

        ////*********************ORDER CRUD METHODS START HERE***************************

        function findOrders() {
            TeamPhunFactory.getOrder()
                .then(function(response) {
                        vm.allOrders = response;

                        return response;
                    },
                    function(error) {
                        console.log(error + "Unable to load the orders from the factory to the controller!");
                    });
        }


        ////*********************add Order METHODS **************************************

        function addOrder(customer) {

            //Order details
            var orderInfo = {
                CustomerId: vm.selectedCustomer,
                OrderTotal: vm.orderTotal,
                TotalCost: vm.totalCost,
                TotalProfit: vm.totalProfit,
                OrderStatus: vm.orderStatus,
                OrderCreatedDate: new Date().toISOString()

            };

            if (vm.orderId) {
                orderInfo.OrderId = vm.orderId;
                updateOrder(vm.orderId, orderInfo);

                // vm.orderId = "";
  // vm.selectCustomer = "";
  // vm.customerId = "";
  // vm.orderTotal = "";
  // vm.totalCost = "";
  // vm.totalProfit = "";
  // vm.orderStatus = "";


            } else {
                TeamPhunFactory.postOrder(orderInfo)
                    .then(function(response) {
                            toastr.success("Successfully added a new order!");
                            activate();

                            $state.go('home.quoteGenerator', { customerObject: customer }, { orderObject: orderId});

                            return response;

                        },
                        function(error) {
                            console.log(error + "Unable to pass the new order information from the controller to TeamPhunFactory!");
                            return error;
                        });
            }
        }



        // fucntion to delete an order

        function removeOrder(id) {
            TeamPhunFactory.deleteOrder(id)
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

        ////*********************populate Order METHODS **************************************
        ///Populate the order form to be editable 


        function populateOrderForm(order) {

            vm.orderId = order.orderId;
            vm.selectCustomer = order.selectCustomer;
            vm.customerId = order.customerId;
            vm.orderTotal = order.orderTotal;
            vm.totalCost = order.totalCost;
            vm.totalProfit = order.totalProfit;
            vm.orderStatus = order.orderStatus;

        }
        ////*********************Update Order METHODS **************************************
        function updateOrder(id, orderdetails) {
            TeamPhunFactory.putOrder(id, orderdetails)
                .then(function(response) {
                    activate();
                    toastr.success("Successfully updated order " + id + " from the controller to the factory!");

                    return response;

                }, function(error) {

                    toastr.error(error + "Order udpate was unsucessful!");
                });
        }


        ////*********************ORDER CRUD METHODS END HERE**************************


        ////*********************ORDER LINE ITEM CRUD METHODS START HERE**************

        function findOrdersLineItems() {
            TeamPhunFactory.getOrderLineItem()
                .then(function(response) {
                        vm.allOrderLineItems = response;
                        return response;
                    },
                    function(error) {
                        console.log(error + "Unable to load the order line item from the factory to the controller!");
                    });
        }


        function addOrderLineItem() {

            //how muc hean pays out of pocket - find out if the number i get is correct
            //add foil

            //print tag = $0.39 per shirt
            //sew in tag = $0.25 per shirt
            // vm.orderLineItemCost =
            //     vm.totalPieces * (
            //         vm.casePrice +
            //         vm.metallicInks +
            //         vm.discharge +
            //         vm.flash +
            //         vm.foil +
            //         vm.folding) +
            //     (vm.pmsColor * vm.totalNumberColors) +
            //     vm.setUp;





            // client quote
            //vm.orderLineItemClientEstimate

            // client paid - sean paid
            //vm.orderLineItemProfit

            // orderLineItem object
            var orderLineItemInfo = {

                // orderId: vm.customerOrderId,
                orderId: 2,
                description: vm.description,
                totalPieces: vm.totalPieces,
                totalNumberColors: vm.totalNumberColors,
                numberPrintLocations: vm.numberPrintLocation,
                metallicLinks: vm.metallicInks,
                discharge: vm.discharge,
                foil: vm.foil,
                pmsColorMatching: vm.pmsColor,
                flash: vm.flash,
                foldingAndBagging: vm.folding,
                salesTax: vm.tax,
                setUp: vm.setUp,
                orderLineItemCost: vm.orderLineItemCost,
                profitMargin: vm.profitMargin,
                orderLineItemClientEstimate: vm.orderLineItemClientEstimate,
                orderLineItemProfit: vm.orderLineItemProfit,
                orderLineItemCreatedDate: new Date().toISOString(),
                vendorName: vm.vendorName,
                categoryId: vm.categoryId,
                categoryName: vm.categoryName,
                brandName: vm.brandName,
                styleId: vm.styleId,
                casePrice: vm.casePrice,
                styleTitle: vm.styleTitle

            };



            TeamPhunFactory.postOrderLineItem(orderLineItemInfo)
                .then(function(response) {
                        toastr.success("Successfully added " + orderLineItemInfo.totalPieces + "  " + orderLineItemInfo.description + " to the order line item table!");
                        return response;
                    },
                    function(error) {
                        console.log(error + "Unable to passed the new order line item information from the controller to TeamPhunFactory!");
                        return error;

                    });

        }
        ////*********************ORDER LINE ITEM CRUD METHODS END HERE******************

        ////*********************Start Color Tier CRUD METHODS HERE******************

        function findColorTier(id) {
            TeamPhunFactory.getColorTier()
                .then(function(response) {
                        findQuantityTier(vm.TotalPieces);

                        vm.allcolors = response;
                        for (var i = 0; i < vm.allcolors.length; i++) {
                            if (vm.allcolors[i].count == id) {

                                vm.colorId = vm.allcolors[i].colorTierId;
                                localStorage.setItem('colorId', vm.colorId);
                                //console.log(vm.vm.colorId);
                            }
                        }
                    },
                    function(error) {
                        console.log(error + "Unable to load the Colors from the factory to the controller!");
                    });

            return vm.colorId;

        }
        var colorId = localStorage.getItem('colorId');

        ////*********************Start Quantity Tier CRUD METHODS HERE******************
        // sql query
        //Select  QuantityTierId  From QuantityTiers where MinQuantity=48 AND MaxQuantity=95  
        //output is : 1
        function findQuantityTier(totalPieces) {
            TeamPhunFactory.getQuantityTier()
                .then(function(response) {

                        vm.quantites = response;
                        for (var i = 0; i < vm.quantites.length; i++) {
                            if (vm.quantites[i].minQuantity <= totalPieces && totalPieces <= vm.quantites[i].maxQuantity) {
                                vm.quantityId = vm.quantites[i].quantityTierId;
                                localStorage.setItem('quantityId', vm.quantityId);
                            }
                        }
                    },
                    function(error) {
                        console.log(error + "Unable to load the Colors from the factory to the controller!");
                    });
            return vm.quantityId;
        }


        ////*********************Start QuantityPrices Tier CRUD METHODS HERE******************

        function findColorQuantityPrice() {
            var quantityId = parseInt(localStorage.getItem('quantityId'));
            var colorId = parseInt(localStorage.getItem('colorId'));
            //console.log(colorId);
            //console.log(quantityId);        
            TeamPhunFactory.getColorQuantityPrice()
                .then(function(response) {

                        vm.quantityPrices = response;
                        for (var i = 0; i < vm.quantityPrices.length; i++) {
                            if (vm.quantityPrices[i].colorTierId == colorId && quantityId == vm.quantityPrices[i].quantityTierId) {
                                vm.price = vm.quantityPrices[i].price;
                                localStorage.setItem('price', vm.price);
                                //console.log(localStorage.getItem('price'));
                            }
                        }
                        // return vm.quantityPrices;
                    },
                    function(error) {
                        console.log(error + "Unable to load the Color Quantity Price from the factory to the controller!");
                    });
            return vm.price;
        }

    }

})();
