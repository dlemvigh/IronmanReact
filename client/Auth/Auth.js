import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        if (callback) {
          const profile = this.getProfile();
          callback(profile);          
        }
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile_name', authResult.idTokenPayload.given_name);
    localStorage.setItem('profile_pic', authResult.idTokenPayload.picture);

    const [provider, provider_user_id] = authResult.idTokenPayload.sub.split("|");
    localStorage.setItem('provider', provider);
    localStorage.setItem('provider_user_id', provider_user_id);
  }

  setActiveUser(user) {
    localStorage.setItem('active_user', user);    
  }

  getActiveUser() {
    return localStorage.getItem('active_user');        
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile_name');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('provider');
    localStorage.removeItem('provider_user_id');
    localStorage.removeItem('active_user');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getProfile() {
    return {
      name: localStorage.getItem('profile_name'),
      username: (localStorage.getItem('profile_name') || "").toLowerCase(),
      picture: localStorage.getItem('profile_pic'),
      provider: localStorage.getItem('provider'),
      providerUserId: localStorage.getItem('provider_user_id'),
      activeUser: localStorage.getItem('active_user'),
    };
  }

}
