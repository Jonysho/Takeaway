const router = require("express").Router();
const {OAuth2Client} = require('google-auth-library');
const { login, googleLogin, register } = require('../controllers/userController');

// User Login routes
router.post('/login', login)
      .post('/register', register)

// OAuth routes
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

router.post('/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  const {access_token } = tokens
  googleLogin(req, res, access_token)
});

router.post('/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})

module.exports = router;