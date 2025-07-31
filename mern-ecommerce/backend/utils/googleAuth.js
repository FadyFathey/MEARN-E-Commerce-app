const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google ID token
exports.verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
      success: true,
      data: {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    return {
      success: false,
      error: 'Invalid Google token',
    };
  }
};

// Exchange authorization code for tokens
exports.exchangeCodeForTokens = async (code, redirectUri) => {
  try {
    const { tokens } = await client.getToken({
      code,
      redirect_uri: redirectUri,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    });
    return {
      success: true,
      data: tokens,
    };
  } catch (error) {
    console.error('Code exchange failed:', error);
    return {
      success: false,
      error: 'Failed to exchange code for tokens',
    };
  }
};

// Get user info from Google
exports.getGoogleUserInfo = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
    const userInfo = await response.json();
    return {
      success: true,
      data: userInfo,
    };
  } catch (error) {
    console.error('Failed to get Google user info:', error);
    return {
      success: false,
      error: 'Failed to get user info from Google',
    };
  }
};
