var path = require('path');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

import mongoose from "mongoose"
mongoose.Promise = global.Promise;

import { populate } from "./util/data.js"
populate();

import schema from "./graphql";

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

mongoose.connect('mongodb://localhost/ironman');

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');