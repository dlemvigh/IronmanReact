module.exports = {
  apps: [{
    name: "ironman",
    script: "../server/index.js",
    watch: false,
    env: {
      "NODE_ENV": "development"
    },
    env_test: {
      "NODE_ENV": "test"
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
}