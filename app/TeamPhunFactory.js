(function() {
    'use strict';

    angular
        .module('app')
        .factory('TeamPhunFactory', TeamPhunFactory);

    TeamPhunFactory.$inject = ['$http','$q'];

    /* @ngInject */
    function TeamPhunFactory($http,$q) {
        var service = {
            getCustomer: getCustomer,
            postCustomer: postCustomer,
            deleteCustomer: deleteCustomer,
            putCustomer: putCustomer
        };
        return service;

        ////////////////

//************START OF CUSTOMER CRUD METHODS*************************************//

        function getCustomer() {
        	var defer= $q.defer();
        	 $http({
        		method:'GET',
        		url:''
        	})
        	 .then(function(reponse){
        	 	if(typeof response.data ==='object'){
        	 		defer.resolve(response);
        	 	} else {
        	 		defer.reject('No data found in file!')
        	 	}
        	 },
        	 function(error){
        	 	defer.reject(error + "unable to get the customer from the database in factory");
        	 });
        	 return defer.promise;
        }

         function postCustomer(customerInfo) {
        	var defer= $q.defer();
        	 $http({
        		method:'POST',
        		url:'',
        		data:customerInfo
        	})
        	 .then(function(reponse){
        	 	if(typeof response.data ==='object'){
        	 		defer.resolve(response);
        	 	} else {
        	 		defer.reject('No data found in file!')
        	 	}
        	 },
        	 function(error){
        	 	defer.reject(error + "unable to get the customer from the database in factory");
        	 });
        	 return defer.promise;
        }

         function deleteCustomer(customerId) {
        	var defer= $q.defer();
        	 $http({
        		method:'DELETE',
        		url:''+ CustomerId
        	})
        	 .then(function(reponse){
        	 	if(typeof response.data ==='object'){
        	 		defer.resolve(response);
        	 	} else {
        	 		defer.reject('No data found in file!')
        	 	}
        	 },
        	 function(error){
        	 	defer.reject(error + "unable to get the customer from the database in factory");
        	 });
        	 return defer.promise;
        }
   function putCustomer(data, Id) {
            var defer= $q.defer();
             $http({
                method:'PUT',
                url:''+ Id,
                data: data
            })
             .then(function(reponse){
                if(typeof response.data ==='object'){
                    defer.resolve(response);
                } else {
                    defer.reject('No data found in file!')
                }
             },
             function(error){
                defer.reject(error + "unable to get the customer from the database in factory");
             });
             return defer.promise;
        }

//************END OF CUSTOMER CRUD METHODS*************************************//


//************START OF ORDER CRUD METHODS*************************************//






//************END OF ORDER CRUD METHODS*************************************//




    }
})();	