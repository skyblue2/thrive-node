// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app        = express();


// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3030; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/careers')


/// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/careers/:s1/:s2/:s3')

	.get(function(req, res) {
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '3c6b1c4b-6d78-4c28-bb30-b334c020d814',
  'password': '3NXVMhe8hVTJ',
  'version_date': '2017-02-27'
});

var parameters = {
  'url': 'www.ibm.com',
  'features': {
    'categories': {}
  }
};

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    res.json(response);
});
	});


router.route('/question')

	.post(function(req, res) {

    var body = req.body;
	var answer = body.q;

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '3c6b1c4b-6d78-4c28-bb30-b334c020d814',
  'password': '3NXVMhe8hVTJ',
  'version_date': '2017-02-27'
});

var parameters = {
  'text': answer,
  'features':
    {
    'categories': {
    'emotion': true,
          'sentiment': true,
          'limit': 2}
   ,
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 5
    }
  }
}
//4200
natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    res.json(response);
});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
