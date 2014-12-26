angular.module('data')
  .factory('apiService', function ($location, Restangular, settings) {
    switch(settings.api.storage) {
      case 'rest':
        return Restangular.withConfig(function (RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl(settings.api.url);
        });
      break;
    }

  });
