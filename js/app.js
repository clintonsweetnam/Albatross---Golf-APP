var Albatross = angular.module('Albatross', [
	'ngRoute',
	'AlbatrossControllers',
  'RemoteServerServices',
  'ngSanitize'
	]);


Albatross.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      }).
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);

Albatross.run(['$rootScope',
  function ($rootScope) {
    $rootScope.AppConfig = AppConfig;
    $rootScope.Messages = Messages;
    $rootScope.Lables = Labels;
  }
]);
