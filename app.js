var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-discord').Strategy;
var session  = require('express-session');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

//set up Discord auth and session
var UserTable = require('./database/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
    var foundUser = UserTable.findOrCreateUserById(obj.id, obj, function(record){
        console.log(`Auth gets: ${record}`);
        obj.airtableId = record.getId();
        done(null, obj);
    });
    
});

var scopes = ['identify'];
console.log(process.env.DISCORD_SECRET);
passport.use(new Strategy({
    clientID: '443134608280780804',
    clientSecret: process.env.DISCORD_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/callback',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
var auth = require('./routes/authentication');
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error(err.stack)
  res.status(404).send('Not Found!')
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

console.log('Server Ready!');
module.exports = app;
