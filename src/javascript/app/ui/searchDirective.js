angular.module('ui')
  .directive('search', function($timeout){
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'views/search.html',
      replace: true,
      scope: {
        term: '=?',
        details: '=?'
      },
      link: function($scope, $element) {
        var $input = $element.find('[type="search"]');

        $scope.$watch('term', function(term) {
          $scope.termText = term;
          $timeout(function() {
            $input.focus();
            google.maps.event.trigger($input[0], 'focus', {})
          }, 0);
        });

        $scope.$watch('termText', function(termText) {
          $scope.term = termText;
        });

        $input.on('focus blur', function(e) {
          $input.parent()[e.type === 'focus' ? 'addClass': 'removeClass']('focus');
        });

      }
    };
  });