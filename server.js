const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/client'));
// app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.resolve(__dirname, 'views'));
app.set("view engine", "ejs");

var db;
MongoClient.connect('mongodb://jennafavorites:Rileylove98!@ds021333.mlab.com:21333/favorite-places', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function() {
    console.log('listening on 3000');
  });

});

app.get('/', (req,res) => {
  res.sendFile(__dirname + './client/login.html')
});

app.get('/main', (req, res) => {
  res.sendFile(__dirname + './client/index.html')
});

app.get('/favorites', function(req, res) {
  db.collection('favorites').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {favorites: result});
  });
});

app.get('/stylefav', function(req, res) {
  res.sendFile('/Users/jenna/Desktop/codesmith/ExploreYourCity/views/stylefav.css');
});

app.post('/favorites', function(req, res) {
  var placeName = req.body.place;
  console.log(req.body);
  console.log(placeName);
  db.collection('favorites').save(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/favorites');
  });
});
