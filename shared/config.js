const base = {
  db: "ironman",
};

export const prod = {
  ...base,
  port: 4000, 
  callbackUrl: "https://ironman.dlemvigh.dk/callback"
};

export const test = {
  ...base,
  db: "test",
  port: 4001,
  callbackUrl: "https://test.ironman.dlemvigh.dk/callback"
};

export const dev = {
  ...base,
  port: 8080,
  callbackUrl: "http://localhost:8080/callback"
};

export const config = { prod, test, dev };

export function getEnv() {
  switch(process.env.NODE_ENV) {
    case "development":
      return "dev";
    case "test":
      return "test";
    case "production":
    default:
      return "prod";
  }
}

export function getConfig() {
  const env = getEnv();
  return config[env];
}