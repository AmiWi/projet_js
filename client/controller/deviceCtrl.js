app.controller('deviceCtrl',function($scope, $rootScope, devices, devicesFactory){

	console.log('Test');

	$scope.devices = devices;

	console.log($scope.devices);
	
});