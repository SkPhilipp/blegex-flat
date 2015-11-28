angular.module('blegex.user', ['LocalStorageModule']);

angular.module('blegex.user').service('Authentication', function ($q, localStorageService) {

    var self = this;

    self._authorization = localStorageService.get('authorization') || null;

    self.isSignedIn = localStorageService.get('isSignedIn') || false;

    /**
     * Cofigures authentication to use the given credentials on service requests.
     *
     * @param email
     * @param password
     */
    self.login = function (email, password) {
        self._authorization = 'Basic ' + window.btoa(email + ':' + password);
        self.isSignedIn = true;
        localStorageService.set('authorization', self._authorization);
        localStorageService.set('isSignedIn', self.isSignedIn);
    };

    /**
     * Logs the user out, clearing the local authorization.
     */
    self.logout = function () {
        self._authorization = null;
        self.isSignedIn = false;
        localStorageService.set('authorization', self._authorization);
        localStorageService.set('isSignedIn', self.isSignedIn);
    };

});

angular.module('blegex.user').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

angular.module('blegex.user').factory('authInterceptor', function ($q, $rootScope, Authentication) {
    return {
        request: function (config) {
            // if the request url is /.?services\/.*/
            var index = config.url.indexOf('services/');
            if(index == 0 || index == 1){
                if (Authentication._authorization) {
                    config.headers['Authorization'] = Authentication._authorization;
                }
            }
            return config || $q.when(config);
        }
    };
});
