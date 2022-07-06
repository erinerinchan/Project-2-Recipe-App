// Libraries for creating the server
require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require('express-session')

const authRoutes = require("./server/routes/authRoutes.js");
const passportSetup = require('./config/passport-setup');

// The instance that hosts the server
const app = express();

// The port number the server runs on
const port = process.env.PORT || 3000;

// Setting the folder for layout
app.set("layout", "./layouts/main");

// Setting ejs as the views engine
app.set("view engine", "ejs");

// Defining public folder for browser to access files
app.use(express.static("public"));

// Using main.ejs file in /views/layouts as layout
app.use(expressLayouts);

// Printing out request information
app.use(morgan("tiny"));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

// Parsing url queries to req.query
app.use(express.urlencoded({ extended: true }));

// Parsing multi-parts to req.body and req.files
app.use(require("./server/_helpers/parse-data"));

// Defining homepage route for the server
app.use("/", require("./server/routes/recipeRoutes.js"));

// Defining authentication route for the server
app.use('/auth', authRoutes);

// Starting the server
app.listen(port, () => console.log(`Listening to port ${port}`));
