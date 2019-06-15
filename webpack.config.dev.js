const config = require("./webpack.config");

const { getConfig } = require("./shared/config");

module.exports = {
  ...config,
  entry: [
    ...config.entry,
    `webpack-express-reload/client?http://0.0.0.0:${getConfig().port}/_testapp`
  ]
};
