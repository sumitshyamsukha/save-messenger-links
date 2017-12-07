var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/msg', function (req, res) {
  var keys = Object.keys(req.body);
  if (keys.length == 1) {
  	var message = keys[0];
  	console.log(message);
  }
  res.send('done');
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))