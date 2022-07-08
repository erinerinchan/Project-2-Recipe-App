const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const { User } = require('../models/database');

// Login page
router.get("/log-in", (req, res) => res.render("log-in"));

// Sign up page
router.get("/sign-up", (req, res) => res.render("sign-up"));

// Register handle
router.post("/sign-up", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("sign-up", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("sign-up", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            new User({
              name,
              email,
              password: hash
            })
              .save()
              .then(() => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/log-in");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;
