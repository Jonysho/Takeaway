const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const { login, googleLogin, register } = require('../controllers/userController');
const requireAdminAuth = require('../middleware/requireAdminAuth');
const requireAuth = require('../middleware/requireAuth');

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

router.get('/checkUserToken', requireAuth, (req, res) => {
  res.status(200).json({isUser: true})
})

router.get('/checkAdminToken', requireAdminAuth, (req, res) => {
  res.status(200).json({isAdmin: true}) 
})

module.exports = router;