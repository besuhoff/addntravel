angular.module('ui')
  .directive('gallery', function($sce){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/gallery.html',
      replace: true,
      scope: {
        photos: '=?'
      },
      link: function($scope, $element) {
        $scope.large = {};


        $scope.setLargeImage = function(image) {
          $scope.large = image;
          $scope.htmlAttributions = $sce.trustAsHtml(image.attributions.join(' '));
        };

        $scope.next = function() {
          var index = ($scope.photos.indexOf($scope.large) + 1) % $scope.photos.length;
          $scope.setLargeImage($scope.photos[index]);
        };

        $scope.$watch('photos', function(photos) {
          if (photos instanceof Array && photos.length) {
            $scope.setLargeImage(photos[0]);
          }
        })
      }
    };
  });