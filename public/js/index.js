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
		})
		.state('/login', {
			url: '/login',
			templateUrl: '/p/auth+login',
			controller: 'loginController'
		})
		.state('/register', {
			url: '/register',
			templateUrl: '/p/auth+register'
		});
}).run(function ($rootScope, $location, $state) {
	$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

		if (toState.url == '/login' && currentUser) {
			console.log('Already logged in');
			e.preventDefault();
		}

		if (!currentUser) {
			//console.log('Still not logged in! to ' + toState);
		}

		//$state.go('/about');
	});
});