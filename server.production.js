var path = require('path')
var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 3000));

// Configure Express
require('./server/config/express')(app);

// Configure Routes
require('./server/config/routes')(app);

// Initialize the SF Service Connection and Logger service
require('./server/config/startup')(app);

// Logger is configured at this point
let logger = require('./server/logger/logger');

// Handle unhandled errors and send back the message for the UI to be useful
app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(err.statusCode || 500).json({ message : err.message });
});


app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening on port %s.', app.get('port'));
})
