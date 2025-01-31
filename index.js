// index.js
// where your node app starts
require('dotenv').config();
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
    const dateParams = req.params.date || Date.now()

    const date = new Date(dateParams);
    let unix = date.getTime();
    let utc = date.toUTCString();

    if (utc == 'Invalid Date') {
      unix = Number(req.params.date);
      date.setTime(unix);
      utc = date.toUTCString();
    }

    if (utc == 'Invalid Date') {
      res.json ({"error": "Invalid Date"});
    } else {
      res.json({
        "unix": unix,
        "utc": utc
      });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
