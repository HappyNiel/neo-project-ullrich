var express = require('express');
var router = express.Router();
var UserTable = require('../database/user');

router.get('/:id', function(req, res, next) {
    let userId = req.params.id;
    UserTable.findById(userId, function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

router.get('/', function(req, res, next) {
    UserTable.getAllUsers(function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

module.exports = router;