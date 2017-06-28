application_file.factory('dataFactory',
    function ($http) {

        return {
            getData: function (gwstoken) {
                return $http(
                {
                    method: "GET",
                    url: "https://betanodeapi.classlink.com/myfiles/services",
                    headers: {
                        gwstoken: 
                    },

                    cache: false
                });
            },
            postData: function (payload) {
                return $http(
                {
                    method: "POST",
                    url: "/api/exampleapi?blob=" + payload,
                    data: payload
                });
            }
        };
    });