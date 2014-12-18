/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.appTitle = element(by.css('#appTitle'));

  this.cell00 = element(by.css('.cell00'));
  this.cell01 = element(by.css('.cell01'));
  this.cell02 = element(by.css('.cell02'));
  this.cell10 = element(by.css('.cell10'));
  this.cell11 = element(by.css('.cell11'));
  this.cell12 = element(by.css('.cell12'));
  this.cell20 = element(by.css('.cell20'));
  this.cell21 = element(by.css('.cell21'));
  this.cell22 = element(by.css('.cell22'));

  this.createGameButton = element(by.css('.createGameButton'));
  this.userName = element(by.css('.userName'));
  this.gameName = element(by.css('.gameName'));
  this.gameTitle = element(by.css('.gameTitle'));
  this.joinGame = element(by.css('.joinGame'));
  this.msgWindow = element(by.css('.msgWindow'));
};

module.exports = new MainPage();
