angular.module('ui')
  .controller('PlacesController', ['$scope', 'settings', function($scope, settings) {
    'use strict';
    $scope.photos = [];
    $scope.places = {};

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
    })

    $scope.setValue = function($event) {
      var search = angular.element('#search [type="search"]')[0];
      google.maps.event.trigger(search, 'focus', {});
      $scope.places.result = $event.target.text;
    }
  }]);