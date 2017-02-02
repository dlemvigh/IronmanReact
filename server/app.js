var path = require("path");
var express = require("express");
var cors = require("cors");
var graphqlHTTP = require("express-graphql");

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import { populate } from "./util/data.js";
populate();

import schema from "./graphql/schema";

var app = express();
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true,
}));

app.use(express.static(path.join(__dirname, "..", "client"), { maxAge: 31536000000}));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

mongoose.connect("mongodb://localhost/ironman");

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");