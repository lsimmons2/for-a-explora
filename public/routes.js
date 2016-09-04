angular.module('routes', []).config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/home', {
                        templateUrl: 'views/home.html',
                            controller: 'Controller',
                            restricted: false
			    })
                .when('/profile', {
                        templateUrl: 'views/profile.html',
                            controller: 'Controller',
                            restricted: true,
			    })
                .when('/login', {
                        templateUrl: 'views/login.html',
                            controller: 'Controller',
                            restricted: false,
			    })
                .when('/hashtag', {
                        templateUrl: 'views/play.html',
                            controller: 'Controller',

                            })
                .otherwise({
                        redirectTo: '/home'
                            });
        }]);
