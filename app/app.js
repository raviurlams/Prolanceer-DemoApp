var prolanceerApp = angular.module('prolanceerDemoApp', ['ngRoute', 'chart.js']);
(function() {
    'use strict';

    prolanceerApp.config(['$routeProvider', '$locationProvider', 'ChartJsProvider', myConfigFn]);

    function myConfigFn($routeProvider, $locationProvider, ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: true
        });
        $routeProvider.
        when('/dashBoard', {
            templateUrl: 'templates/dashBoard.html',
            controller: 'dashBoardCtrl'
        }).
        otherwise({
            redirectTo: '/dashBoard'
        });
    }
    prolanceerApp.run([myRunFn]);

    function myRunFn() {}
})();