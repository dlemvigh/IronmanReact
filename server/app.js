var path = require("path");
var express = require("express");
var cors = require("cors");
var graphqlHTTP = require("express-graphql");
var compression = require("compression");

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import { populate } from "./util/data.js";
populate();

import schema from "./graphql/schema";

var app = express();
app.use(compression());
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true,
}));

app.use(function noCacheForRoot(req, res, next) {
  if (req.url === "/") {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
  }
  next();
});

app.use(express.static(path.join(__dirname, "..", "client"), { maxAge: 31536000000}));

mongoose.connect("mongodb://localhost/ironman");

app.listen(4000);
console.log("Running a GraphQL API server");