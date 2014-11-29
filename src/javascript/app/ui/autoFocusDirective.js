angular.module('ui')
  .directive('autoFocus', function($timeout){
    'use strict';

    return {
      restrict: 'A',
      link: function($scope, element) {
        $timeout(function(){
          element[0].focus();
        }, 0);
      }
    };
  });