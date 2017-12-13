var express = require('express');
var bodyParser = require('body-parser');
var getUrls = require('get-urls');
var _ = require('underscore');

var Msg = require('./database/database.js');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

// EJS
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/links', function (req, res) {
  
  Msg.find({}, function (e, entries) {
    var msgs = _.map(entries, function (entry) {
      return {name: entry.name, link: entry.link};
    });
    msgs = _.groupBy(msgs, msg => msg.name);
    res.render('links.ejs', {links: msgs});
  });

});

app.get('/links/:user', function (req, res) {
  
  var name = req.params['user'];

  Msg.find({name: name}, function (e, entries) {
    var msgs = _.map(entries, function (entry) {
      return {name: entry.name, link: entry.link};
    });
    msgs = _.groupBy(msgs, msg => msg.name);
    res.render('links.ejs', {links: msgs});
  });

});

app.post('/msg', function (req, res) {
  var keys = Object.keys(req.body);
  if (keys.length == 1) {
  	var message = JSON.parse(keys[0]);
    var urlTokens = message['name'].split('/');
    var name = urlTokens[urlTokens.length - 1];

  	var urls = getUrls(message['text']);
	  if (urls.size > 0) {
  		var url = urls.values().next().value;
  		var msg = new Msg({
    			name: name,
    			link: url
  		});
      
      Msg.count({name: name, link: url}, function (err, count) {
        if (err) throw err;

        if (count == 0) {
          msg.save(function (err) {
            if (err) throw err;
            console.log('Saved message!');
          });
        }

      });

	  }
  }
  res.send('done');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));