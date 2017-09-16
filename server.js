// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mangafox = require('node-mangafox');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  mangafox.getPopular(function (list){
    var keys = Object.keys(list)
    var item = keys[Math.floor(Math.random()*keys.length)];
    console.log(item)
    console.log(list[item])
    mangafox.getDetails(list[item].id, function (details) {
      var rating = details[7];
      var link = "http://www.mangafox.me/manga/" + item.toLowerCase().replace (/ /g, '_').replace (/-/g, '_');
      response.render('index',{recommendation: item, link: link, rating: rating});
    });
  });
 
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
