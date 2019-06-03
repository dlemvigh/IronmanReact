const base = {
  db: "ironman",
  apiUrl: "/graphql"
};

const dev = {
  ...base,
  db: "ironman-dev",
  port: 4000,
};

const test = {
  ...base,
  db: "ironman-test",
  port: 4001,
};

const staging = {
  ...base,
  port: 4002,
};

const prod = {
  ...base,
  port: 4000, 
};

const config = { prod, test, staging, dev };

function getEnv() {
  switch(process.env.NODE_ENV) {
    case "development":
      return "dev";
    case "test":
      return "test";
    case "staging":
      return "staging";
    case "production":
    default:
      return "prod";
  }
}

function getConfig() {
  const env = getEnv();
  return config[env];
}

module.exports = {
  config,
  prod,
  test,
  staging,
  dev,
  getEnv,
  getConfig
};