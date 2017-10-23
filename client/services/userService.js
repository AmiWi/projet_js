app.factory('usersFactory', function($resource){

	return $resource('http://localhost:3000/home/:id', {id: '@_id'},
	{
		update:
		{
			method : 'PUT'
		}
	});
});