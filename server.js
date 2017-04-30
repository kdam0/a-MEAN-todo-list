// set up the app
var express = require('express');
var app = express();
var mongoose = require('mongoose');                 // for mongodb
var port = process.env.PORT || 3000;                // the port
// var database = require('./config/database');     // load the database configuration (uri)
// var morgan = require('morgan');                  // for debugging
var bodyParser = require('body-parser');            // for ease of use
var methodOverride = require('method-override');    // just in case

// set up for functionality
mongoose.connect('mongodb://test:admin@ds139665.mlab.com:39665/to_list');    // connect to mongodb
// mongoose.connect('mongodb://localhost/2701');    // connect to mongodb

// set the static files location /public/img will be /img for users
app.use(express.static('./public'));
// app.use(morgan('dev'));                              // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));   // parse application ...url
app.use(bodyParser.json());                             // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
// connect with api
require('./app/routes.js')(app);

// start the app
app.listen(port);
console.log("Listening on port " + port);

