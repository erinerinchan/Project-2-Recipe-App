require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(expressLayouts);

app.use(morgan('tiny'));

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.use(express.urlencoded( { extended: true } ));
app.use(require('./parse-data'))

app.use('/', require('./server/routes/recipeRoutes.js'));

app.listen(port, () => console.log(`Listening to port ${port}`));
