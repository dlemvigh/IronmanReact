const path = require("path");
const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const compression = require("compression");
const mongoose = require("mongoose");
const { populate } = require("./util/data.js");
populate();
const schema = require("./graphql/schema");
const { getConfig } = require("../shared/config");
const config = getConfig();

const app = express();
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const history = require('connect-history-api-fallback');
  const webpackConfig = require("../webpack.config");
  const compiler = webpack(webpackConfig);
  app.use(history());
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
}
// "client": "webpack-dev-server --inline --content-base . --history-api-fallback",
app.use("/graphql", graphqlHTTP({
  schema: schema,
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
app.use(express.static(path.join(__dirname, "..", "client"), {
  maxAge: 31536000000
}));
app.get("*", function (req, res) {
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
const listener = app.listen(config.port, () => {
  console.log("Running a GraphQL API server - ", listener.address().port);
});