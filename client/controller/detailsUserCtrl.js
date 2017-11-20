    //********************************
    // ici tu fais un injection double de dépendances...c'est l'un ou l'autre sinon tu auras des problèmes pour build et minifier ton code en prod...(en vrai c'est surtout cette forme qui est a privilégier)
    //********************************

app.controller("detailsUserCtrl",['$scope','$routeParams', '$http', 'usersFactory', function($scope,$routeParams, $http, usersFactory){
	console.log($routeParams);

	 //********************************
    // ah, voila comment on utilise une factory
    //********************************
	$scope.details = usersFactory.get({id : $routeParams.id});

	console.log($scope.details);
	

}]);