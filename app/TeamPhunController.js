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

        activate();

        ////////////////

        function activate() {
        }
    }
})();	