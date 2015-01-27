
//Constants
RemoteServerServices.factory('Constants', function($rootScope){
	var APIUrls = {
		LoginURL: {
            LocalDev: "http://127.168.1.7:811/",
            Production: "http://127.168.1.7:811/"
        },
	}

	return {
        ServerURL: function () {
            var result;
            switch ($rootScope.AppConfig.Environment)
            {
                case "Production":
                    result = APIUrls.LoginURL.Production;
                    break;
                case "LocalDev":
                    result = APIUrls.LoginURL.LocalDev;
                    break;
            }
            return result;
        },
	}
});