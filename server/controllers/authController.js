/**
 * GET /
 * Authentication - Login
 */
exports.login = async (req, res) => {
  res.render("log-in");
}

/**
 * GET /
 * Authentication - Log out
 */
exports.logout = async (req, res) => {
  // handle with passport
  res.send("logging out");
}

// /**
//  * GET /
//  * Authentication - Google
//  */
// exports.google = async (req, res) => {
//   // handle with passport.js
//   res.send("logging in with Google");
// }

/**
 * GET /
 * Authentication - Facebook
 */
exports.facebook = async (req, res) => {
  // handle with passport.js
  res.send("logging in with Facebook");
}

/**
 * GET /
 * Authentication - Github
 */
exports.github = async (req, res) => {
  // handle with passport.js
  res.send("logging in with Github");
}

/**
 * GET /
 * Authentication - Sign up
 */
exports.signup = async (req, res) => {
  res.render("sign-up");
}
