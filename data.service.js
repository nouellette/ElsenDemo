(function() {
  'use strict';
  
  var app = angular.module('app');

  app.factory('DataService', ['$http', DataService]);
  
  function DataService($http) {
    
    function getData() {
      return $http.get('timeseries.csv')
    }
    
    return {
      getData: getData
    }
  }
  
})();