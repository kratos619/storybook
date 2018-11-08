const express = require('express');
const mongoose = require('mongoose');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// load user model
require('./models/user');
//passport config
require('./config/passport')(passport);
//load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const app = express();

//load keys
const keys = require('./config/keys');

//mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('db connect');
  })
  .catch(err => console.log(err));

app.use(cookiesParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setup globavariables to use req.user globally
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
