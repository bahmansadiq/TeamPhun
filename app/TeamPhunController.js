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
        vm.addOrder=addOrder;
        vm.updateOrder=updateOrder;
        vm.removeCustomer = removeCustomer;
        vm.findCustomerById = findCustomerById;
        vm.updateCustomer = updateCustomer;
        vm.addOrderLineItem = addOrderLineItem;
        vm.populateOrderForm= populateOrderForm;
        vm.removeOrder=removeOrder;
        vm.allCustomers=[];
        vm.specificCustomer = [];
        vm.allOrders = [];
        vm.allOrderLineItems = [];

        activate();

        ////////////////

        function activate() {
            findCustomers();
            findOrders();
            findOrdersLineItems();
        }

        function findCustomers() {
            TeamPhunFactory.getCustomer()
                .then(function(response) {
                       vm.allCustomers=response;
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
                toastr.success("The Customer records with ID: " + vm.customerId + " has been successfully updated");
            }
            else{
		
            	//return toastr.error("Plese fill the form to create a new customer !");
        
                TeamPhunFactory.postCustomer(customerInfo)
                    .then(function(response) {

                            toastr.success("Successfully added " + customerInfo.FirstName + "  " + customerInfo.LastName + " to the customers list!");

                            return response;

                            ;
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

                    toastr.error(error);
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
        ////*********************ORDER CRUD METHODS START HERE***************************
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
		//fucntion to add a new order to the talbe

function addOrder(){
	       //Order details
	  var orderInfo = {
	        CustomerId: vm.selectedCustomer,
	        OrderTotal: vm.orderTotal, 
	        TotalCost: vm.totalCost,
	        TotalProfit: vm.totalProfit,
	     	OrderStatus: vm.orderStatus,
	        OrderCreatedDate: new Date().toISOString()

            };
            if(vm.orderId) {
                orderInfo.OrderId = vm.orderId;
                updateOrder(vm.orderId, orderInfo);
                toastr.success("The order records with ID: " + vm.orderId + " has been successfully updated");
            }
            else{
	TeamPhunFactory.postOrder(orderInfo)
	     .then(function(response) {
              toastr.success("Successfully added the order to the order line item table!");
              activate();
               return response;       
                },
               function(error) {
                  console.log(error + "Unable to passed the new order information from the controller to TeamPhunFactory!");
                  return error;
               });
	}
}
   ////*********************remove order METHODS **************************************
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
 

     function populateOrderForm(order){

				vm.addNewOrder=!vm.addNewOrder;
                vm.orderId = order.orderId;
                vm.selectedCustomer=order.selectCustomer;
                vm.customerId=order.customerId;
                vm.orderTotal= order.orderTotal;
                vm.totalCost=order.totalCost;
                vm.totalProfit=order.totalProfit;
                vm.orderStatus= order.orderStatus;

            }      
   ////*********************Update Order METHODS **************************************
        function updateOrder(id, orderdetails) {
            TeamPhunFactory.putOrder(id, orderdetails)
                .then(function(response) {
                    activate();
                    toastr.success("successfully updated order " + id + " from the controller to the factory!");

                    return response;

                }, function(error){

                    toastr.error("Unable to successfully update order " + id + " from the controller to the factory!");
                });
        }


   ////*********************ORDER CRUD METHODS END HERE***************************
   ////*********************ORDER CRUD METHODS END HERE***************************
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

            // need to add cost in here somewhere! defined in ng-model as vm.cost
            var orderLineItemInfo = {

                orderId: 1,
                vendorId: 1,
                productId: vm.productCode,
                description: vm.description,
                totalPieces: vm.printPieces,
                totalNumberColors: vm.colors,
                numberPrintLocations: vm.locations,
                metallicLinks: vm.metallicInks,
                discharge: vm.discharge,
                foil: vm.foil,
                flash: vm.flash,
                pmsColorMatching: vm.PMSColor,
                foldingAndBagging: vm.folding,
                salesTax: vm.tax,
                profitMargin: vm.profitMargin,
                orderLineItemEstimate: 100,
                OrderLineItemProfit: 200,
                orderLineItemCreatedDate: new Date().toISOString()

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
        ////*********************ORDER LINE ITEM CRUD METHODS END HERE******************
        ////*********************ORDER LINE ITEM CRUD METHODS END HERE******************
    }
})();
