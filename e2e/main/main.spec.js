'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.appTitle.getText()).toBe('Tic Tac Toe');
  });  
});

describe('Play game to win/draw', function() {
  var page;
  var gameId;

  beforeEach(function() {
    gameId = require('uuid').v1();
    browser.get('/');
    page = require('./main.po');
    page.userName.sendKeys('TestPlayToWinUser1-e2e');
    page.gameName.sendKeys(gameId);
    page.createGameButton.click();
  });

  it('should show who is the winner in message window', function() {
    browser.getAllWindowHandles().then(function (handles) {
      var playerX = handles[0];
      var gameToJoin = element(by.css('.joinGame-' + gameId));
      browser.executeScript('window.open("'+ browser.baseUrl +'", "playerO", "fullscreen=yes")');
      browser.switchTo().window('playerO');
      browser.sleep(1000);
      page.userName.sendKeys('TestPlayToWinUser2-e2e')
      browser.sleep(2000);
      gameToJoin.click();
      browser.switchTo().window(playerX);
      browser.sleep(2200);
      page.cell00.click();
      browser.switchTo().window('playerO');
      browser.sleep(2400);
      page.cell10.click();
      browser.switchTo().window(playerX);
      browser.sleep(2600);
      page.cell01.click();
      browser.switchTo().window('playerO');
      browser.sleep(2800);
      page.cell11.click();
      browser.switchTo().window(playerX);
      browser.sleep(3000);
      page.cell02.click();
      browser.sleep(3500);
      expect(page.msgWindow.getText()).toBe('TestPlayToWinUser1-e2e is the Winner!');          
    });
  });

  it('should show draw in the message window', function() {
    browser.getAllWindowHandles().then(function (handles) {
      var playerX = handles[0];
      var gameToJoin = element(by.css('.joinGame-' + gameId));
      browser.executeScript('window.open("'+ browser.baseUrl +'", "playerO", "fullscreen=yes")');
      browser.switchTo().window('playerO');
      browser.sleep(1000);
      page.userName.sendKeys('TestPlayToWinUser2-e2e')
      browser.sleep(2000);
      gameToJoin.click();
      browser.switchTo().window(playerX);
      browser.sleep(2200);
      page.cell00.click();
      browser.switchTo().window('playerO');
      browser.sleep(2400);
      page.cell10.click();
      browser.switchTo().window(playerX);
      browser.sleep(2600);
      page.cell01.click();
      browser.switchTo().window('playerO');
      browser.sleep(2800);
      page.cell11.click();
      browser.switchTo().window(playerX);
      browser.sleep(3000);
      page.cell12.click();
      browser.switchTo().window('playerO');
      browser.sleep(3200);
      page.cell02.click();
      browser.switchTo().window(playerX);
      browser.sleep(3400);
      page.cell20.click();
      browser.switchTo().window('playerO');
      browser.sleep(3600);
      page.cell21.click();
      browser.switchTo().window(playerX);
      browser.sleep(3800);
      page.cell22.click();
      browser.sleep(4000);
      expect(page.msgWindow.getText()).toBe('It\'s a draw!');      
    });
  });
});

