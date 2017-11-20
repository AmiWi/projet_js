app.factory('devicesFactory', function($resource){
	//********************************
	// pourquoi ton service pointe vers la même api que l'autre ?
	//********************************
	return $resource('http://localhost:3000/home',
	{
		update:
		{
			method : 'PUT'
		}
	});
});