const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require('passport');

// Authentication - Login
router.get("/log-in", authController.login);

// Authentication - Logout
router.get("/log-out", authController.logout);

// Authentication - Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/log-in' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Authentication - Facebook
router.get("/facebook", authController.facebook);

// Authentication - Github
router.get("/github", authController.github);

// Authentication - Sign up
router.get("/sign-up", authController.signup);

module.exports = router;
