describe('Controller', function(){

  beforeEach(module('ctrl'));
  var $scope;
	beforeEach(inject(function($rootScope, $controller, _$httpBackend_){
		$scope = $rootScope.$new();
		$controller = $controller('Controller', {
			$scope: $scope
		});
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/test').respond(200, 'text');
	}));

  describe('test()', function(){
    it('Function defined', function(){
      expect($scope.test).toBeDefined();
      //expect($scope.test()).toEqual('text');
      //$scope.ans = $scope.test();
      //expect($scope.ans).toEqual('text');
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
