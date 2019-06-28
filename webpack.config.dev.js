const config = require("./webpack.config");

const { getConfig } = require("./shared/config");

module.exports = {
  ...config,
  entry: [
    ...config.entry,
    `webpack-express-reload/client?http://127.0.0.1:${
      getConfig().port
    }/_testapp`
  ]
};
