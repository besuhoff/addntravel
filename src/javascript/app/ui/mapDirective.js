angular.module('ui')
  .directive('map', function(){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/map.html',
      replace: true,
      scope: {
        details: '=?'
      },
      link: function($scope, $element) {
        $scope.$watch('details', function(details) {
          if (details === undefined) {

          } else {
            var geo = details.geometry;
            var myLatlng = new google.maps.LatLng(geo.location.lat(), geo.location.lng());
            var map = new google.maps.Map($element[0], {
              center: myLatlng,
              zoom: 15
            });

            if (geo.viewport) {
              map.fitBounds(geo.viewport);
            }

            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: details.name
            });
          }
        })
      }
    };
  });