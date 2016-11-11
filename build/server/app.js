'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _data = require('./util/data.js');

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');

var _require = require('graphql');

var buildSchema = _require.buildSchema;

_mongoose2.default.Promise = global.Promise;

(0, _data.populate)();

var app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: _schema2.default,
  pretty: true,
  graphiql: true
}));

app.use(express.static(path.join(__dirname, "..", "client")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

_mongoose2.default.connect('mongodb://localhost/ironman');

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');