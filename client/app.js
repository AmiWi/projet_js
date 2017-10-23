var app = angular.module('app', [ 'ngRoute', 'ngResource' ])

app.config(['$routeProvider','$locationProvider',
function($routeProvider,$locationProvider){
    $routeProvider
        .when('/', {
            templateUrl:'client/views/home.html', 
            controller: "userCtrl",
            resolve: {
                users : function(usersFactory){
                    console.log('hello');
            
                    return usersFactory.query();

                }
            }
        })
        .when('/add', {
            templateUrl:'client/views/add.html', 
            controller: "addCtrl"
        })
        .when('/device', {
            templateUrl:'client/views/devices.html', 
            controller: "deviceCtrl",
            resolve: {
                devices : function(devicesFactory){
                    console.log('hello2');
            
                    return devicesFactory.query();

                }
            }
        })
        .otherwise({
            redirectTo:'/'
        });
}]);