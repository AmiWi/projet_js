var app = angular.module('app', [ 'ngRoute', 'ngResource' ])

app.config(['$routeProvider','$locationProvider',
function($routeProvider,$locationProvider){
    $routeProvider
        .when('/', {
            templateUrl:'client/views/home.html', 
            controller: "userCtrl",
                resolve: {
                    users : function(usersFactory){
                        console.log('app, resolve, users');
                
                        return usersFactory.query();

                    }
                }
        })
        .otherwise({
            redirectTo:'/'
        });
}]);