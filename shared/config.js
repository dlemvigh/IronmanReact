const base = {
  db: "ironman",
  apiUrl: "/graphql"
};

const prod = {
  ...base,
  db: "ironman-dev",
  port: 4000, 
  callbackUrl: "https://ironman.dlemvigh.dk/callback"
};

const test = {
  ...base,
  db: "ironman-test",
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
};

const staging = {
  ...base,
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
};

const dev = {
  ...base,
  port: 4000,
  callbackUrl: "http://localhost:8080/callback"
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