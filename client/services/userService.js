app.factory('usersFactory', function($resource){
	return $resource('http://localhost:3000/home/:userId',{userId:'@id'},
	{
		update:
		{
			method : 'PUT'
		}
	});
});