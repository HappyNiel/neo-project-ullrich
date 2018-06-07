var express = require('express');
var router = express.Router();
var UserTable = require('../database/user');

router.get('/:id', function(req, res) {
    let userId = req.params.id;
    UserTable.findById(userId, function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

router.get('/', function(req, res) {
    UserTable.getAllUsers(function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

module.exports = router;