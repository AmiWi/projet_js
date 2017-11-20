app.controller("detailsUserCtrl",['$scope','$routeParams', '$http', 'usersFactory', function($scope,$routeParams, $http, usersFactory){
	console.log($routeParams);

	$scope.details = usersFactory.get({id : $routeParams.id});

	console.log($scope.details);
	

}]);