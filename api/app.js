require('dotenv').config();

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require("cors");
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
let LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo');


// Routes Directory
let usersRouter = require('./routes/user');
let reservationsRouter = require('./routes/reservation');
let yogaClassesRouter = require('./routes/yogaclass');

let createError = require('http-errors');

// User Model 
const User = require('./models/user.js');

// DB Connection
const mongoose = require('mongoose');

let app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies)
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoString = process.env.DATABASE_URL

// Connecting to MongoDB and Printing Error or Confirmation
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
});
database.once('connected', () => {
  console.log('Database Connected');
});

// *** AUTH ***
const secret = process.env.SECRET

const store = new MongoStore({
  mongoUrl: mongoString,
  secret,
  touchAfter: 60
})

store.on('error', function (e) {
  console.log('Session store error', e)
})

const sessionConfig = {
  store: store,
  name: 'session',
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes Declaration
app.use('/user', usersRouter);
app.use('/reservation', reservationsRouter);
app.use('/yogaclass', yogaClassesRouter)

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

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = app;
