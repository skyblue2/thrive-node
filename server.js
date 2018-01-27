// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('lodash');
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

var ConversationV1 = require('watson-developer-cloud/conversation/v1');
router.route('/chat')

	.post(function(req, res) {
	var answer = req.body.q;

// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: '3c6b1c4b-6d78-4c28-bb30-b334c020d814', // replace with username from service key
  password: '3NXVMhe8hVTJ', // replace with password from service key
  path: { workspace_id: '2be60c63-6011-47cc-b417-f34a299f8aec' }, // replace with workspace ID
  version_date: '2017-05-26'
});

// Start conversation with empty message.
conversation.message({}, processResponse);

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }

  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
  }
}
});



router.route('/question/:answer')

	.post(function(req, res) {
    var questionNo = req.params.answer;
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
          'limit': 2}
   ,
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 3
    }
  }
}

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err) {
    console.log('error:', err);
    }
  else {
    var result = {};
    var sentimentScore = _.sumBy(response.keywords, function(o) { return o.sentiment.score; });
    var sentimentFeedback;
    var question;
    if (sentimentScore < 0) {
        sentimentFeedback = "You sound worried.";
        switch (questionNo) {
        case "1":
            question = "What would you like to do about this?";
            break;
        case "2":
            question = "another question here?";
            break;
        }
    } else if (sentimentScore > 0) {
        sentimentFeedback = "It sounds as though this would make you much happier";
    } else {
        sentimentFeedback = "Okay"
    }
    result.question = question;
    result.feedback = sentimentFeedback;
    result.sentimentScore = sentimentScore;
    res.json(result);
    }
});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
