module.exports = {
  apps: [{
    script: "../server/index.js",
    env_test: {
      name: "ironman-test",
      "NODE_ENV": "test"
    },
    env_production: {
      name: "ironman",
      "NODE_ENV": "production"
    }
  }]
};