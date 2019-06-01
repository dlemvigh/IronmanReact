var path = require("path");
var express = require("express");
var cors = require("cors");
var graphqlHTTP = require("express-graphql");
var compression = require("compression");

import mongoose from "mongoose";

import { populate } from "./util/data.js";
populate();

import schema from "./graphql/schema";
import { getConfig } from "../shared/config";
const config = getConfig();

var app = express();
app.use(compression());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
  })
);

app.use(function noCacheForRoot(req, res, next) {
  if (req.url === "/") {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "..", "client"), { maxAge: 31536000000 })
);

app.get("*", function(req, res) {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Expires: "-1",
    Pragma: "no-cache"
  });
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

const db = `mongodb://127.0.0.1/${config.db}`;
mongoose.connect(db, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(config.port);
console.log("Running a GraphQL API server");
