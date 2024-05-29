export default Object.freeze({
  OIDC_AUTHORITY: import.meta.env.OIDC_AUTHORITY,
  OIDC_CLIENT_ID: import.meta.env.OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET: import.meta.env.OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI: import.meta.env.OIDC_REDIRECT_URI,
  API_HOST: import.meta.env.API_HOST,
  API_BASEPATH: import.meta.env.API_BASEPATH,
  BASE_PREFIX: import.meta.env.BASE_PREFIX,
  PRIVATE_KEY_REDIS: import.meta.env.PRIVATE_KEY_REDIS,
  PRIVATE_INIT_VECTOR: import.meta.env.PRIVATE_INIT_VECTOR,
});
