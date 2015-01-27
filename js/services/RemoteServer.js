var RemoteServerServices = angular.module('RemoteServerServices', ['ngResource']);

RemoteServerServices.factory('RemoteServer', function($rootScope, $http, $q, Constants){

	return {
        Login: function (event) {

            var request = {"ActionType" : 0,"Event" : {"DeltaX":event.deltaX,"DeltaY":event.deltaY,"IsFinal":event.isFinal}};

            return $http({
                  method: "POST",
                  url : Constants.ServerURL(),
                  data : JSON.stringify(request),
                  headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                  },
                  }).then(function(response){
                      if(response.data == '"Unauthorized"'){
                      return "Unauthorized";
                    }
                    else
                    {
                      return response.data.replace(/["']/g, "");
                    }
                  });
        },
	}
});