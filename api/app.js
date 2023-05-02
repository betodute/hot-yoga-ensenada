var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
var LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo');

// Routes Directory
var usersRouter = require('./routes/user');
var reservationsRouter = require('./routes/reservation');
var yogaClassesRouter = require('./routes/yogaclass');

// User Model 
const User = require('./models/user.js');

// DB Connection
require('dotenv').config();
const mongoose = require('mongoose');

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoString = process.env.DATABASE_URL
const secret = process.env.SECRET

// Connecting to MongoDB and Printing Error or Confirmation
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
});
database.once('connected', () => {
  console.log('Database Connected');
});

const store = new MongoStore({
  mongoUrl: mongoString,
  secret,
  touchAfter: 24 * 60 * 60 // doesn't update db if same for amount of seconds
})

store.on('error', function (e) {
  console.log('Session store error', e)
})

const sessionConfig = {
  store: store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Routes Declaration
app.use('/user', usersRouter);
app.use('/reservation', reservationsRouter);
app.use('/yogaclass', yogaClassesRouter)

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
