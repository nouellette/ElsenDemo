(function() {
  'use strict';
  
  var app = angular.module('app', []);
  
  app.controller('MainCtrl', ['DataService', MainCtrl]);
  
  function MainCtrl(DataService) {
    var vm = this;
    vm.headers = [];
    vm.rows = [];
    vm.sortType = 'name';
    vm.sortReverse = false;
    vm.showChart = false;
    
    vm.makeChart = function(data) {
      vm.showChart = true;
          
      Highcharts.chart('container', {
          chart: {
              type: 'spline'
          },
          title: {
              text: 'Timeseries'
          },
          subtitle: {
              text: 'Demo'
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                  month: '%e. %b',
                  year: '%b'
              },
              title: {
                  text: 'Date'
              }
          },
          yAxis: {
              title: {
                  text: 'Range'
              },
              min: 0
          },
          tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
          },
  
          plotOptions: {
              spline: {
                  marker: {
                      enabled: true
                  }
              }
          },
  
          series: [data]
      });
    }
    
    DataService.getData().then(function(result){
      var lines = result.data.split('\n');
      var tempObj = {};
      lines.forEach(function(line, index){
        if(index !== 0){
          var lineData = line.split(',');
          var point = [lineData[1], Number(lineData[2])]

          tempObj[lineData[0]] ? 
            tempObj[lineData[0]].push(point) : tempObj[lineData[0]] = [point];
        }
      })
      for(var key in tempObj) {
        vm.rows.push({
          name: key,
          data: tempObj[key]
        })
      }
    });
  }

})();