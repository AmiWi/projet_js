    //********************************
    // ici tu fais un injection simple de dépendances
    //********************************
app.controller('userCtrl',function($scope, $rootScope, users){

	$scope.users = users;

	console.log($scope.users);
	
});