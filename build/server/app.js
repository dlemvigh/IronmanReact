"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _data = require("./util/data.js");

var _schema = require("./graphql/schema");

var _schema2 = _interopRequireDefault(_schema);

var _config = require("../shared/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");
var express = require("express");
var cors = require("cors");
var graphqlHTTP = require("express-graphql");
var compression = require("compression");

_mongoose2.default.Promise = global.Promise;

(0, _data.populate)();

var config = (0, _config.getConfig)();

var app = express();
app.use(compression());
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema: _schema2.default,
  pretty: true,
  graphiql: true
}));

app.use(function noCacheForRoot(req, res, next) {
  if (req.url === "/") {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
  }
  next();
});

app.use(express.static(path.join(__dirname, "..", "client"), { maxAge: 31536000000 }));

app.get("*", function (req, res) {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Expires': '-1',
    'Pragma': 'no-cache'
  });
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

var db = "mongodb://127.0.0.1/" + config.db;
_mongoose2.default.connect(db);

app.listen(config.port);
console.log("Running a GraphQL API server");