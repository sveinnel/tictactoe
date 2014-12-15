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

    $httpBackend.when('POST', '/api/joinGame')
      .respond([{event: 'GameJoined', id: 'testId', name: 'testGame'}]);

    $httpBackend.when('POST', '/api/placeMove')
      .respond([{event: 'MovePlaced'}]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be abele to create game', function () {
    
    scope.gameName = 'testGame';
    scope.userName = 'tester';
    scope.createGame();
    $httpBackend.flush();
    expect(scope.showGame).toBe(true);
    expect(scope.side).toBe('X');
  });

  it('should be abele to join game', function () {
    
    scope.userName = 'tester';
    scope.joinGame('testId', 'testGame');
    $httpBackend.flush();
    expect(scope.showGame).toBe(true);
    expect(scope.side).toBe('O');
    expect(scope.gameName).toBe('testGame');
  });

   it('should be abele to play move', function () {
    scope.side = 'X';
    scope.userName = 'tester';
    scope.opponentJoined = true;
    scope.gameId = "testId";
    scope.cellClick([0,0]);
    $httpBackend.flush();
    expect(scope.cell).toEqual([ [ 'X', '', '' ], [ '', '', '' ], [ '', '', '' ] ]);
  });

});
