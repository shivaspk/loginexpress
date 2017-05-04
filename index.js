// Load http module.
var http = require('http');
// Load express module.
var express = require('express');

// Initialize app object.
var app = new express();

//initialize mongodb client
var MongoClient = require('mongodb').MongoClient;

//we need to connect to mydb database we created hence use the following urlencoded
var url = 'mongodb://localhost:27017/mydb';

//for processiong HTTP POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Use app.set to add the view engine.
// Ass app is an express object, it has a view engine property.
app.set('view engine', 'pug');

// Set path to views.
app.set('views', './views');


// Basic routing.
app.get('/', function(req, res) {
    // res.send is changed to result.render in order to load the correct view.
    res.render('index');
});

// Login routing.
app.post('/login', function(req, res) {
  var username = req.body.username;
   var password = req.body.password;

  MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected correctly to server.");
        var myusers = db.collection('myusers');

      //  users.find().toArray(function(err, items) {});

       myusers.findOne(req.body, function(err, user) {

        //   console.log(user);
           if(user!=null)
           {
           //  console.log(user.username);
          //   console.log(user.password);
               res.send("Login successful for user: "+ username);
           }
           else {
              res.send("Login failed!" );
                }
       });
    //    console.log(users);
    }
    db.close();
});
  //  printing the request body.
//    res.send(JSON.stringify(req.body));
});

// Create server and listen on port 3000.
http.createServer(app).listen(3000, function() {
    console.log('Server running...');
});
