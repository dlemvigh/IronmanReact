var express = require("express");
var path = require("path");

var app = express();

var port = 8082;

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function(){
  console.log("app listening on port: " + port);
});