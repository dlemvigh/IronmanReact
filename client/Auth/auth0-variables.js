import { getConfig } from "../../shared/config";

const config = getConfig();

export const AUTH_CONFIG = {
  domain: 'dlemvigh.eu.auth0.com',
  clientId: 'DnUSBlDyiIFfEjzBraZy2c3zb6KnZSmk',
  callbackUrl: config.callbackUrl
};
