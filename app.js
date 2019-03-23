require('dotenv').config()
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
    UserTable.findOrCreateUserByDiscordId(obj.id, obj, function(record){
        obj.airtableId = record.getId();
        if(record.fields.hasOwnProperty('IsAdmin')){
            obj.isAdmin = record.fields.IsAdmin
        } else {
            obj.isAdmin = false;
        }
        done(null, obj);
    });
});

var scopes = ['identify'];
passport.use(new Strategy({
    clientID: '457106543561670665',
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
var user = require('./routes/user');
var team = require('./routes/team');
var season = require('./routes/season');
app.use('/api/auth', auth.router);
app.use('/api/user', user);
app.use('/api/team', team);
app.use('/api/season', season);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("404 handler");
    res.status(404).send("Sorry can't find that!");
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (res.headersSent) {
        return next(err)
    }
    if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err
    res.status(err.statusCode).send(err.message);
});

console.log('Server Ready!');
module.exports = app;
