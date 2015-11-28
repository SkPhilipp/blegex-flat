angular.module('blegex', ['ngRoute', 'ui.bootstrap', 'blegex.user', 'blegex.ui', 'blegex.resources']);

/**
 * Puts both UI and Authentication on the $rootScope for easy referencing from the views.
 */
angular.module('blegex.ui').run(function ($rootScope, UI, Authentication) {
    $rootScope.ui = UI;
    $rootScope.authentication = Authentication;
});

angular.module('blegex').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .when('/documents', {
            controller: 'DocumentsController',
            templateUrl: 'views/documents.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })
        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'views/register.html'
        })
        .when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'views/logout.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('blegex').controller('HomeController', function ($scope) {
});

angular.module('blegex').controller('DocumentsController', function ($scope) {
});

angular.module('blegex').controller('LoginController', function ($scope, $location, Authentication, User) {

    $scope.login = function (form) {
        var user = new User({
            username: form.email.$modelValue,
            password: form.password.$modelValue
        });
        user.$verify()
            .then(function () {
                Authentication.login(form.email.$modelValue, form.password.$modelValue);
                $location.path('/inbox');
            });
    };

});

angular.module('blegex').controller('RegisterController', function ($scope, $location, Authentication, User) {

    $scope.register = function (form) {
        var user = new User({
            username: form.email.$modelValue,
            password: form.password.$modelValue
        });
        user.$save()
            .then(function () {
                Authentication.login(form.email.$modelValue, form.password.$modelValue);
                $location.path('/inbox');
            });
    };

});

angular.module('blegex').controller('LogoutController', function ($scope, Authentication) {

    Authentication.logout();

});
