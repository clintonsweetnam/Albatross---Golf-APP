var AlbatrossControllers = angular.module('AlbatrossControllers', []);

AlbatrossControllers.controller('SplashCtrl', function ($scope, $location) {

  $scope.GoToHome = function(){

    $location.path( "/home" );

  }

});

AlbatrossControllers.controller('HomeCtrl', function ($scope, $location, $rootScope, RemoteServer) {

  $scope.InitHammerJS = function(){

    var touchPad = document.getElementById('touchPad');

    var height = window.innerHeight

    touchPad.style.height = height * 0.8 + "px";

    var hammertime = new Hammer(touchPad);

    hammertime.on('panleft panright panup pandown', function(ev) {

        console.log(ev)

        RemoteServer.Login(ev).then(function(response){
          console.log(response)
        },
        function(response){
          //returned error code
          console.log(response)
        });
    });
  }

});