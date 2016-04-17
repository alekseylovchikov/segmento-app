angular
	.module('segmentoApp', ['ngAnimate', 'firebase', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'index.html',
				controller: 'MainController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);