app.controller('userCtrl',function($scope, $http, $rootScope, users, usersFactory){

	console.log(users);

	$scope.users = users;

	console.log($scope.users);
	
});