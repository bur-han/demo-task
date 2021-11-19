import { google } from 'googleapis';
import config from '../../config';
import axios from 'axios';
import { response } from 'express';

const googleConfig = {
  clientId: config.googleClientId, 
  clientSecret: config.googleClientSecret, 
  redirect: 'http://localhost:3000/todos'
};

// Create the google auth object which gives us access to talk to google's apis.
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

 // This scope tells google what information we want to request.
 const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

// Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 function getConnectionUrl(auth:any) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }

// Create the google url to be sent to the client.
function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return {url, auth};
}

async function getUserEmail(code:any) {
    try{
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
          const user  = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });
          return ((user as any).data.email)
    }
    catch(err)
    {
        response.json(err)
    }
 
  };

export {urlGoogle,getUserEmail}
