import { google } from 'googleapis';
import config from '../Config/google';
import axios from 'axios';

class GoogleService {
  public googleCreds = {
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    redirect: 'http://localhost:3000/todos',
  };

  // Create the google auth object which gives us access to talk to google's apis.
  public async createConnection() {
    return new google.auth.OAuth2(
      this.googleCreds.clientId,
      this.googleCreds.clientSecret,
      this.googleCreds.redirect
    );
  }

  // This scope tells google what information we want to request.
  public defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  // Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
  public async getConnectionUrl(auth: any) {
    return await auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: this.defaultScope,
    });
  }

  // Create the google url to be sent to the client.
  public async urlGoogle() {
    const auth = this.createConnection(); // this is from previous step
    const url = this.getConnectionUrl(auth);
    return { url, auth };
  }

  public async getUserProfile(code: any) {
    try {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: config.googleClientId,
          client_secret: config.googleClientSecret,
          redirect_uri: 'http://localhost:3000/todos',
          grant_type: 'authorization_code',
          code,
        },
      });

      const user = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      return (user as any).data;
    } catch (err: any) {
      return { message: err.message };
    }
  }
}
export default GoogleService;
