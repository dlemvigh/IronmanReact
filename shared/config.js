const base = {
    db: "ironman",
    port: 4000
};

export const prod = {
    ...base,
}

export const test = {
    ...base,
    db: "test",
    port: 4001
}

export const dev = {
    ...base
}

export const config = { prod, test, dev }

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