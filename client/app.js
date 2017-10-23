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
        .when("/home/:id", {
            templateUrl: 'client/views/details.html',
            controller: "detailsUserCtrl",
            resolve:{
                details : function(usersFactory, $route){
                    //console.log($route);
                    //console.log($route.current.params.id);
                    return usersFactory.get({userId : $route.current.params.id});
                }
            }
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