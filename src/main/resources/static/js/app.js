(function () {
    angular.module('todo', ['ngMessages'])
        .directive('klfUsernameNotFound', function($q, userService){
            return {
                require:'ngModel',
                link: function(scope, element, attributes, modelController){
                    modelController.$asyncValidators.klfUsernameNotFound = function(modelValue, viewValue){
                        console.log('viewValue: ' + viewValue);
                        if(!viewValue){
                            return $q.reject();
                        }

                        return userService.search(viewValue)
                            .then(function(users){
                                if(users.length > 0){
                                    return $q.resolve();
                                } else {
                                    return $q.reject();
                                }
                            }, function(){
                               return $q.reject();
                            });
                    }
                }
            }
        })
        .factory('userService', function ($http) {
            return {
                search: function (query) {
                    return $http({
                        url: '/users',
                        method: 'GET',
                        params: {
                            query: query
                        }
                    }).then(function (response) {
                        console.log(response);
                        return response.data.users;
                    }, function (response) {
                        console.log('failed');
                        return response;
                    });
                }
            }
        })
        .controller('TodoController', function ($scope, userService) {
            $scope.query = {};
            $scope.submit = function () {
                if ($scope.form.$valid) {
                    console.log('Submiting form');
                    userService.search($scope.query.name).then(function (users) {
                        $scope.users = users;
                    }, function (response) {
                        console.log('No users found');
                        $scope.users = [];
                    });
                } else {
                    console.log('Form is invalid');
                }
            }
        });

})();
