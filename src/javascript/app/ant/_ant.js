(function(window){
  'use strict';

  var app = angular.module('ant', ['app-templates', 'data',  'ui']);

  app.config(function($locationProvider, growlProvider) {
    $locationProvider.html5Mode(true);
    growlProvider.globalTimeToLive(3000);
  });

  window.app = app;
})(window);