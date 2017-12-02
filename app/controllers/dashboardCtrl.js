(function() {
    'use strict';

    prolanceerApp.controller("dashBoardCtrl", ['$scope','$q','$http','$interval', dashBoardCtrlFn]);

    function dashBoardCtrlFn($scope,$q,$http,$interval) {
    	let apiURL = 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10';
    	var timerstarts = null;
        function getFreshData (){
        	$scope.labels = [];
        	$scope.data = [];

            var promiseObj = getServerData(apiURL);
            promiseObj.then(function(data) {               
                $scope.labels = data.map(a => a.symbol);
                $scope.data.push(data.map(a => a.percent_change_1h));//price_usd;
                //stops any running interval to avoid two intervals running at the same time
        	    $interval.cancel(timerstarts);
            });
            promiseObj.catch(function(d) {
                console.error('ERROR  ', d);
                return d;
            });
            promiseObj.finally(function(d) {
                console.info('finally block executed :', d);
            });
        }

        function getServerData(url) {
            var deferred = $q.defer();
            $http({
                    method: 'GET',
                    url: url
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
        getFreshData();        
        var timerstarts = $interval(getFreshData, 300000);
    }
})();