app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '/p/index'
		})
		.state('/about', {
			url: '/about',
			templateUrl: '/p/about'
		});
});