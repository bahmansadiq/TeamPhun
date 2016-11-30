(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeamPhunSASController', TeamPhunSASController);

    TeamPhunSASController.$inject = ['TeamPhunSASFactory'];

    /* @ngInject */
    function TeamPhunSASController(TeamPhunSASFactory) {
        var vm = this;
        vm.title = 'TeamPhunSASController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();	