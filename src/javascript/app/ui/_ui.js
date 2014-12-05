(function($) {
  var module = angular.module('ui', ['angular-growl', 'ngAutocomplete']);
  module.run(function() {
    $('#search input[type="search"]').on('focus blur', function(e) {
      $(this).closest('#search')[e.type === 'focus' ? 'addClass': 'removeClass']('focus');
    });
  })
})(jQuery);