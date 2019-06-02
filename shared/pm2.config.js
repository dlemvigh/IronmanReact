module.exports = {
  apps: [{
    script: "../server/index.js",
    watch: true,
    env_test: {
      name: "ironman-test",
      "NODE_ENV": "test"
    },
    env_staging: {
      name: "ironman-staging",
      "NODE_ENV": "staging"
    },
    env_production: {
      name: "ironman",
      "NODE_ENV": "production"
    }
  }]
};