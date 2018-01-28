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




router.route('/question/:answer')

  .post(function (req, res) {
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

    natural_language_understanding.analyze(parameters, function (err, response) {
      if (err) {
        console.log('error:', err);
      } else {
        var result = {};
        var sentimentScore = _.sumBy(response.keywords, function (o) {
          return o.sentiment.score;
        });
        var sentimentFeedback;
        var question;
        if (sentimentScore <= 0) {
          sentimentFeedback = "You sound worried.";
          switch (questionNo) {
            case "1":
              question = "I can see that would be a concern for you. Let's discuss this and find some ideas to help. It's important to understand what you'd like to achieve so let's start that as a first step. What would your goal be?";
              break;
            case "2":
              question = "What is your motivation for your goal?";
              break;
            case "3":
              question = "So your goal is to earn money so that you can have a better life. What have you done so far towards achieving this goal?";
              break;

            case "4":
              question = "Okay that's good. What else have you done?";
              break;
            default:
               question = "Let's divert. Is there anyone in your life who can help you achieve your goals?";
               break;
          }
        } else if (sentimentScore > 0) {
          question = "It sounds as though this would make you much happier";
        } else {
          question = "Okay"
        }
        result.question = question;
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