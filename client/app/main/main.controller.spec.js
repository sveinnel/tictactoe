'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.when('POST', '/api/createGame')
      .respond([{event: 'GameCreated', id: 'testId'}]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be abele to create game', function () {
    
    expect(scope.gameName).toBe('');
    scope.gameName = 'testGame';
    scope.userName = 'tester';
    scope.createGame();
    $httpBackend.flush();
    expect(scope.showGame).toBe(true);
    expect(scope.side).toBe('X');
  });


});
