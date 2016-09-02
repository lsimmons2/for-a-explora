angular.module('ctrl', []).controller('Controller', function($scope, $http, $location){
	$scope.message = 'sah';
    $scope.test = function(){
        $http.get('/test')
        .then(function(data){
                console.log(data);
            }, function(err){
                console.log(err);
            });
    };

    $scope.logout = function(){
        $http.get('/logout')
        .then(function(data){
                console.log('Session ended');
                $location.path('/login');
            }, function(err){
                console.log('Session not ended: ', err);
            })
    };

    $scope.follows = function(){
        $http.get('/follows')
        .then(function(data){
                console.log(data);
                $scope.pix = data.data;
            }, function(err){
                console.log(err);
            })
    };
    
    });

