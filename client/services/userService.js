app.factory('usersFactory', function($resource){

	return $resource('http://localhost:3000/home/',
	{
		update:
		{
			method : 'PUT'
		}
	});
});