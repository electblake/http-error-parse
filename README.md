http-error-parse
================

Given an error stack object, grab a message and/or the associated HTTP response code (404, 400, 401 etc)


*I created this for use with express.js but it should be able to handle different types of errors, and intelligently return a HTTP response code and a simple string message.*

## Install
`npm install http-error-parse --save`

## Usage
in express.js for example:

```
var errorPrase = require('http-error-parse');
var _handleErrorResponse = function(err, res) {
	var code = errorParse.getCodeSync(err),
		message = errorParse.getMessageSync(err);
	res.send(code, message);
});

app.get('/', function(req, res) {
  // generate an error
  var err = new Error('Something is missing or not found');
  
  return _handleErrorResponse(err, res);
  
});

```

Note that this is just a rough draft implementation, the real usage is for extracting information, not playing with express.js or responses.

## Contribution
fork. pull. ... profit.
