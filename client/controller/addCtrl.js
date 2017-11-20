app.controller("addCtrl", function($scope, $rootScope, usersFactory, $window) {
    
    $scope.users = new usersFactory();

    $scope.addUser = function(user) {
        console.log(user);
        user.$save();
        $window.location.href = '/';
    };
});