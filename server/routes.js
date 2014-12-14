/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  // Create new Game
  app.use('/api/createGame', require('./api/createGame')(app).router);
  //Join Created game
  app.use('/api/joinGame', require('./api/joinGame')(app).router);
  //Place Move
  app.use('/api/placeMove', require('./api/placeMove')(app).router);
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
