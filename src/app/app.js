angular
	.module('segmentoApp', ['ngAnimate', 'firebase', 'ui.router', 'ngRoute'])
    .config(function($stateProvider, $routeProvider) {
        $routeProvider
			.when('/', {
				templateUrl: 'index.html',
				controller: 'MainController'
			})
            .otherwise({
                redirectTo: '/'
            });

        $stateProvider
            .state('list', {
                url: '/?sort&type',
                controller: 'MainController as list',
                templateUrl: 'src/app/components/views/table.html',
                params: {
                    sort: {
                        value: '',
                        squash: true
                    },
					type: {
						value: 'asc',
						squash: true
					}
                }
            });
    });
