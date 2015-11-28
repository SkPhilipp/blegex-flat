angular.module('blegex.resources', ['ngResource']);

angular.module('blegex.resources').factory('User', function ($resource) {
    return $resource('/services/users/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        verify: {
            method: 'POST',
            url: '/services/users/verify'
        }
    });
});
