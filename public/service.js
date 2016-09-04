angular.module('service', []).factory('Service', ['$location', '$http', function($location, $http){
    function loggedIn(){
        $http.get('/loggedIn')
        .then(function(data){
          if(data.data == true) {
            console.log('in from service');
            console.log('data received from service:', data);
            return true;
          } else if(data.data == false) {
            console.log('out from service');
            console.log('data.data', data.data);
            console.log('data received from service:', data);
            return false;
          } else {
            console.log('/loggedIn res is neither true nor false');
            return false;
          }
        }, function(err){
          console.log('Error calling \'/loggedIn\' in Service.loggedIn()');
          return false;
        });
    };

    return ({
      loggedIn: loggedIn
    });
}]);
