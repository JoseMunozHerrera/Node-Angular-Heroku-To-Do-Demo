// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var pg = require('pg');
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors'); app.use(cors());

var connString = 'postgres://plfjrfjflbxwed:429871ae48ec51a54f49930e8de464221b74a3734de9dfe01a78d95ea418d982@ec2-54-83-192-245.compute-1.amazonaws.com:5432/d5i7lgob0ufa26';

	
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
//require('./app/routes.js')(app);

app.get('/', function(request, response) {

	pg.connect(connString, function(err, client, done) {
		if(err) response.send("Could not connect to DB: " + err);
		client.query('SELECT * FROM tabla', function(err, result) {
			done();
			if(err) return response.send(err);
			response.send(result.rows);
		});
	});
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
