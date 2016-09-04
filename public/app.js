angular.module('App', ['ngRoute', 'ctrl', 'routes', 'service', 'mgcrea.ngStrap']).run(function($rootScope, $location, $route, $http, Service){
  $rootScope.$on('$routeChangeStart',
    function(event, next, current){
      $http.get('/loggedIn')
      .then(function(data){
        if(data.data){
          $rootScope.in = true;
          console.log('User logged in');
        } else {
          $rootScope.in = false;
          console.log('User not logged in');
        }
        if(!data.data && next.restricted){
          $location.path('/home');
        }
      }, function(err){
        $location.path('/home');
        alert('Sorry, you can\'t be authenticated now - server not working properly')
      })
    })
})
