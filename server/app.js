const path = require("path");
const express = require("express");
const Sentry = require("@sentry/node");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const compression = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { populate } = require("./util/data.js");
populate();
const schema = require("./graphql/schema");
const { getConfig } = require("../shared/config");
const config = getConfig();
let db = `mongodb://127.0.0.1/${config.db}`;

Sentry.init({
  dsn: "https://08e7875cccec4f35a420c0b278f27e08@sentry.io/1476748",
  environment: process.env.NODE_ENV
});

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(compression());
app.use(cors());
app.use(bodyParser());

// if (process.env.NODE_ENV === "development") {
//   const webpack = require("webpack");
//   const webpackDevMiddleware = require("webpack-dev-middleware");
//   const webpackHotMiddleware = require("webpack-hot-middleware");
//   const history = require("connect-history-api-fallback");
//   const webpackConfig = require("../webpack.config");
//   const compiler = webpack(webpackConfig);
//   app.use(history());
//   app.use(
//     webpackDevMiddleware(compiler, {
//       noInfo: true,
//       publicPath: webpackConfig.output.publicPath
//     })
//   );
//   app.use(webpackHotMiddleware(compiler));
// }

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema: schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn: error => {
      if (error.path || error.name !== "GraphQLError") {
        Sentry.withScope(scope => {
          scope.addEventProcessor(async event => {
            return Sentry.Handlers.parseRequest(event, req);
          });

          if (error.source && error.source.body) {
            scope.setExtra("body", error.source.body);
          }
          scope.setExtra("positions", error.positions);
          scope.setExtra("path", error.path);

          Sentry.captureException(error);
        });
      }
      return {
        message: error.message,
        stack:
          process.env.NODE_ENV === "development"
            ? error.stack.split("\n")
            : null
      };
    }
  }))
);
app.use(function noCacheForRoot(req, res, next) {
  if (req.url === "/") {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
  }
});
app.use(
  express.static(path.join(__dirname, "..", "client"), {
    maxAge: 31536000000
  })
);
app.get("*", function(req, res) {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Expires: "-1",
    Pragma: "no-cache"
  });
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const listener = app.listen(config.port, () => {
  console.log("Running a GraphQL API server - ", listener.address().port);
});
