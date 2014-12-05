angular.module('ui')
  .controller('PlacesController', ['$scope', 'settings', function($scope, settings) {
    'use strict';
    $scope.photos = [];
    $scope.examples = ["Statue of Liberty, New-York", "Big Ben, London"];

    $scope.$watch('details', function(details) {
      if (details !== undefined) {
        var photos = [];
        if (details.photos instanceof Array) {
          angular.forEach(details.photos, function (value) {
            photos.push({
              url: value.getUrl({maxHeight: settings.google.photos.height}),
              attributions: value.html_attributions
            });
          });
        }
        $scope.photos = photos;
      }
    });

    $scope.setSearchTerm = function(term) {
      $scope.searchTerm = term;
    }
  }]);