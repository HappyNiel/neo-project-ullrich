var express = require('express');
var passport = require('passport');
var router = express.Router();
var UserTable = require('../database/user');

var scopes = ['identify'];

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}

router.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
router.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), 
    function(req, res) { 
        // auth success
        res.redirect('/api/auth/info') ;
    } 
);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/info', checkAuth, function(req, res) {
    //console.log(req.user)
    res.json(req.user);
});


module.exports = router;