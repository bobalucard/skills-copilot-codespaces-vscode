// Create web server
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

// use body parser to parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up static directory
app.use(express.static(path.join(__dirname, "public")));

// set up comments file
var COMMENTS_FILE = path.join(__dirname, "comments.json");

// set up port
app.set("port", (process.env.PORT || 3000));

// set up routes
app.get("/api/comments", function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});