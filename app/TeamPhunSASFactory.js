(function() {
    'use strict';
    angular
        .module('app')
        .factory('TeamPhunSASFactory', TeamPhunSASFactory);
    TeamPhunSASFactory.$inject = ['$http', '$q'];
    /* @ngInject */
    function TeamPhunSASFactory($http, $q) {
        var service = {
            getCategory: getCategory,
            getSpecs: getSpecs,
            getProducts: getProducts,
            getStyleByCatId: getStyleByCatId
        };
        return service;
        ////////////////
        function getCategory() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'https://api.ssactivewear.com/v2/categories/',
                    headers: {
                        authorization: 'Basic ODM0ODQ6ZTEzMjMwNjMtMjk4OC00NGY0LTk3NWYtMGZlNDZhZjRhZTY3',
                        UserName: 83484,
                        Password: 'e1323063-2988-44f4-975f-0fe46af4ae67'
                    }
                })
                .then(
                    function(response) {
                        if (typeof response === 'object') {
                            defer.resolve(response);
                        }
                    },
                    function(err) {
                        defer.reject(err);
                    });
            return defer.promise;
        };

        function getSpecs() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: ' https://api.ssactivewear.com/v2/specs/',
                    headers: {
                        authorization: 'Basic ODM0ODQ6ZTEzMjMwNjMtMjk4OC00NGY0LTk3NWYtMGZlNDZhZjRhZTY3',
                        UserName: 83484,
                        Password: 'e1323063-2988-44f4-975f-0fe46af4ae67'
                    }
                })
                .then(
                    function(response) {
                        if (typeof response === 'object') {
                            defer.resolve(response);
                        }
                    },
                    function(err) {
                        defer.reject(err);
                    });
            return defer.promise;
        }

        function getProducts(styleId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'https://api.ssactivewear.com/v2/products/?style=' + styleId,
                    headers: {
                        authorization: 'Basic ODM0ODQ6ZTEzMjMwNjMtMjk4OC00NGY0LTk3NWYtMGZlNDZhZjRhZTY3',
                        UserName: 83484,
                        Password: 'e1323063-2988-44f4-975f-0fe46af4ae67'
                    }
                })
                .then(
                    function(response) {
                        if (typeof response === 'object') {
                            defer.resolve(response);
                            console.log(response);
                        }
                    },
                    function(err) {
                        defer.reject(err);
                    });
            return defer.promise;
        }

        function getStyleByCatId(Id) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'https://api.ssactivewear.com/v2/styles/?fields=StyleID,BrandName,Title,Categories,StyleImage',
                    headers: {
                        authorization: 'Basic ODM0ODQ6ZTEzMjMwNjMtMjk4OC00NGY0LTk3NWYtMGZlNDZhZjRhZTY3',
                        UserName: 83484,
                        Password: 'e1323063-2988-44f4-975f-0fe46af4ae67'
                    }
                })
                .then(
                    function(response) {
                        if (typeof response === 'object') {
                            defer.resolve(response);
                            console.log(response);
                        }
                    },
                    function(err) {
                        defer.reject(err);
                    });
            return defer.promise;
        }
    }
})();
