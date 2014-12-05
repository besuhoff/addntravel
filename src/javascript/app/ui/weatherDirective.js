angular.module('ui')
  .directive('weather', function(){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/weather.html',
      replace: true,
      scope: {
        details: '=?'
      },
      link: function($scope, $element) {

      }
    };
  });