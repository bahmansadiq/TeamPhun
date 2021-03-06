(function() {
    'use strict';

    angular
        .module('app')
        .factory('TeamPhunFactory', TeamPhunFactory);

    TeamPhunFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function TeamPhunFactory($http, $q) {
        var service = {
            getCustomer: getCustomer,
            postCustomer: postCustomer,
            deleteCustomer: deleteCustomer,
            putCustomer: putCustomer,
            getCustomerById: getCustomerById,
            getOrder: getOrder,
            postOrder: postOrder,
            putOrder: putOrder,
            deleteOrder: deleteOrder,
            getOrderLineItem: getOrderLineItem,
            postOrderLineItem: postOrderLineItem,
            getColorTier: getColorTier,
            getQuantityTier: getQuantityTier,
            getColorQuantityPrice: getColorQuantityPrice
        };
        return service;

        ////////////////

        //************START OF CUSTOMER CRUD METHODS*************************************//

        function getCustomer() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/customers/'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the customer from the database in factory");
                    });
            return defer.promise;
        }
        /*Get a specific customer by ID*/

        function getCustomerById(id) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/customers' + '/' + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found the specific Customer from the database in factory!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the  specific customer from the database in factory");
                    });
            return defer.promise;
        }

        function postCustomer(newCustomer) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: 'http://localhost:57450/api/customers',
                    data: newCustomer,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the new customer from  TeamPhunFactory to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the new customer from TeamPhunFactory to the Database!");

                    });
            return defer.promise;
        }

        function deleteCustomer(customerId) {
            var defer = $q.defer();
            $http({
                    method: 'DELETE',
                    url: 'http://localhost:57450/api/customers/' + customerId
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the customer from the database in factory");
                    });
            return defer.promise;
        }

        function putCustomer(Id, customerInfo) {
            var defer = $q.defer();
            $http({
                    method: 'PUT',
                    url: 'http://localhost:57450/api/customers/' + Id,
                    data: customerInfo
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the customer from the database in factory");
                    });
            return defer.promise;
        }

        //************END OF CUSTOMER CRUD METHODS*************************************//


        //************START OF ORDER CRUD METHODS*************************************//

        function getOrder() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/orders'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the order from the database in factory");
                    });
            return defer.promise;
        }

        ///Add a new order 


        function postOrder(nerOrder) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: 'http://localhost:57450/api/orders',
                    data: nerOrder,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the new order from  TeamPhunFactory to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the new order from TeamPhunFactory to the Database!");

                        console.log("not able to post the order");

                    });
            return defer.promise;
        }

        //delete an order
        function deleteOrder(orderId) {

            var defer = $q.defer();
            $http({
                    method: 'DELETE',
                    url: 'http://localhost:57450/api/orders/' + orderId
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "nable to get the customer from the database in factory");
                    });
            return defer.promise;
        }

        ///update order 

        function putOrder(Id, orderdetails) {
            var defer = $q.defer();
            $http({
                    method: 'PUT',
                    url: 'http://localhost:57450/api/orders/' + Id,
                    data: orderdetails
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the order from the database in factory");
                    });
            return defer.promise;
        }

        //************END OF ORDER CRUD METHODS**********************************//

        //************BEGIN ORDER LINE ITEM CRUD METHODS************************//

        function getOrderLineItem() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/orderlineitems'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the orderLineItem from the database in factory");
                    });

            return defer.promise;

        }

        function postOrderLineItem(newOrderLineItem) {

            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: 'http://localhost:57450/api/orderlineitems',
                    data: newOrderLineItem,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the new order line item from  TeamPhunFactory to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the new order line item from TeamPhunFactory to the Database!");

                    });

            return defer.promise;
        }

        //************END OF ORDER LINE ITEM CRUD METHODS**************************//
        //************END OF ORDER LINE ITEM CRUD METHODS**************************//



        //************START OF ColorTier CRUD METHODS**************************//
        //************START OF ColorTier CRUD METHODS**************************//
   function getColorTier() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/colortiers'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the ColorQuantityPrice from the database in factory");
                    });
            return defer.promise;
        }

        //************END OF ColorTier CRUD METHODS**************************//
        //************END OF ColorTier CRUD METHODS**************************//


        //************START OF getQuantityTier CRUD METHODS**************************//
        //************START OF getQuantityTier CRUD METHODS**************************//
   function getQuantityTier() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/quantitytiers'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the quantity tiers from the database in factory");
                    });
            return defer.promise;
        }

        //************END OF getQuantityTier CRUD METHODS**************************//
        //************END OF getQuantityTier CRUD METHODS**************************//


 ////*********************Start QuantityPrices Tier CRUD METHODS HERE******************
 ////*********************Start QuantityPrices Tier CRUD METHODS HERE******************
   function getColorQuantityPrice() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/colorquantityprices'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get the ColorQuantityPrice from the database in factory");
                    });
            return defer.promise;
        }


 ////*********************END OFF QuantityPrices Tier CRUD METHODS HERE******************
 ////*********************END OFF QuantityPrices Tier CRUD METHODS HERE******************

    }
})();
