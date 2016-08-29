angular.module('routes', []).config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/home', {
                        templateUrl: 'views/home.html',
                            controller: 'Controller'
			    })
                .when('/sah', {
                        templateUrl: 'views/sah.html',
                            controller: 'Controller'
			    })
                .when('/login', {
                        templateUrl: 'views/login.html',
                            controller: 'Controller'
			    })
                .when('/play', {
                        templateUrl: 'views/play.html',
                            controller: 'Controller'
                            })
                .otherwise({
                        redirectTo: '/home'
                            });
        }]);