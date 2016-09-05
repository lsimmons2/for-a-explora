describe('Controller', function(){

  beforeEach(module('ctrl'));
  var $scope;
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller = $controller('Controller', {
			$scope: $scope
		});
	}));

  describe('test()', function(){
    it('Function defined', function(){
      expect($scope.test).toBeDefined();
    });
  });

  describe('logout()', function(){
    it('Function defined', function(){
      expect($scope.logout).toBeDefined();
    });
  });

  describe('follows()', function(){
    it('Function defined', function(){
      expect($scope.follows).toBeDefined();
    });
  });

  describe('ownPix()', function(){
    it('Function defined', function(){
      expect($scope.ownPix).toBeDefined();
    });
  });

});
