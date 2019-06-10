const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const robots = require("express-robots-txt");
const mongoose = require("mongoose");
const path = require("path");
const Sentry = require("@sentry/node");

const { getConfig } = require("../shared/config");
const schema = require("./graphql/schema");

const config = getConfig();
const db = `mongodb://127.0.0.1/${config.db}`;
const { populate } = require("./util/data.js");
populate();

Sentry.init({
  dsn: "https://08e7875cccec4f35a420c0b278f27e08@sentry.io/1476748",
  environment: process.env.NODE_ENV
});

const isDev = process.env.NODE_ENV === "development";
console.log("is dev", isDev, process.env.NODE_ENV);

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.use(robots({ UserAgent: "*", Disallow: "/admin" }));

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

let compiler;
if (isDev) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const history = require("connect-history-api-fallback");
  const webpackConfig = require("../webpack.config.dev");
  compiler = webpack(webpackConfig);
  app.use(history());
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
} else {
  app.use(
    express.static(path.join(__dirname, "..", "client"), {
      setHeaders: (res, path) => {
        if (/bundle\..*\.js/.test(path)) {
          res.set("Cache-Control", "max-age=31557600000");
        } else {
          res.set("Cache-Control", "cache, no-store, must-revalidate");
          res.set("Pragma", "no-cache");
          res.set("Expires", 0);
        }
      }
    })
  );
  app.get("*", function(req, res) {
    res.set("Cache-Control", "cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", 0);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
  });
}

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
if (isDev) {
  const webpackReload = require("webpack-express-reload");
  const server = webpackReload(app, compiler, { path: "/_testapp" });
  const listener = server.listen(config.port, () => {
    console.log("Running a GraphQL API server - ", listener.address().port);
  });
} else {
  const listener = app.listen(config.port, () => {
    console.log("Running a GraphQL API server - ", listener.address().port);
  });
}
