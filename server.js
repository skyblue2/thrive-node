// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('lodash');
var app = express();


// configure body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3030; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/careers')


/// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/careers/:s1/:s2/:s3')

  .get(function (req, res) {
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

    natural_language_understanding.analyze(parameters, function (err, response) {
      if (err)
        console.log('error:', err);
      else
        res.json(response);
    });
  });

router.route('/chat')

  .post(function (req, res) {
    var answer = req.body.q;

    // Set up Conversation service wrapper.
    var ConversationV1 = require('watson-developer-cloud/conversation/v1.js');
    var conversation = new ConversationV1({
      username: 'c907f284-82c9-4538-972a-70d5208ff368', // replace with username from service key
      password: 'w7fcdT4dXXZB', // replace with password from service key
      version_date: '2016-07-11'
    });

    // Start conversation with empty message.
    conversation.message({
      workspace_id: '28ae3b36-bc40-42ba-8f3c-fdc941f52ade',
    }, processResponse);

    // Process the conversation response.
    function processResponse(err, response) {
      if (err) {
        console.error(err); // something went wrong
        reject(err);
        return;
      }

      // If an intent was detected, log it out to the console.
      if (response.intents.length > 0) {
        console.log('Detected intent: #' + response.intents[0].intent);
      }

      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
        var result = {};
        result.question = response.output.text[0];
        getSentiment(answer).then(function(score) {
          result.sentimentScore = score;
          res.json(result);

      conversation.message({
            workspace_id: '28ae3b36-bc40-42ba-8f3c-fdc941f52ade',
            input: { text: answer },
            // Send back the context to maintain state.
            context : response.context,
          }, processResponse)
        });
      }

    }
  });


function getSentiment(answer) {
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '3c6b1c4b-6d78-4c28-bb30-b334c020d814',
    'password': '3NXVMhe8hVTJ',
    'version_date': '2017-02-27'
  });

  var parameters = {
    'text': answer,
    'features': {
      'categories': {
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 3
      }
    }
  }

  return new Promise(function(resolve, reject) {
  natural_language_understanding.analyze(parameters, function (err, response) {
    if (err) {
      console.log('error:', err);
      reject(err);
    } else {
      var sentimentScore = _.sumBy(response.keywords, function (o) {
        return o.sentiment.score;
      });
      resolve(sentimentScore);
    }
  });
});

}
// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);