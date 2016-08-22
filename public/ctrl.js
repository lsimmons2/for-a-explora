angular.module('ctrl', []).controller('Controller', function($scope, $http, $location){
	$scope.message = 'sah';
	$scope.instaAuth = function(){
	    $http.jsonp('https://api.instagram.com/oauth/authorize/?client_id=7953d7ce6a4e4a98bda5ccda117c6399&redirect_uri=http://localhost/panel&response_type=code&callback=JSON_CALLBACK')
	    //don't know how to handle the response, since it's coming from my server and not insta's? or b/c the MIME type is wrong...
	    .then(function(data){
		    $location.path('/play');
		    console.log(data);
		}, function(data){
		    console.log('nah');
		    console.log(data);
		});
	};
    });

