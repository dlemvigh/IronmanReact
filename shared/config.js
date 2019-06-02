const base = {
  db: "ironman",
};

export const prod = {
  ...base,
  db: "ironman-dev",
  port: 4000, 
  callbackUrl: "https://ironman.dlemvigh.dk/callback"
};

export const test = {
  ...base,
  db: "ironman-test",
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
};

export const staging = {
  ...base,
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
};

export const dev = {
  ...base,
  port: 8080,
  callbackUrl: "http://localhost:8080/callback"
};

export const config = { prod, test, staging, dev };

export function getEnv() {
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

export function getConfig() {
  const env = getEnv();
  return config[env];
}