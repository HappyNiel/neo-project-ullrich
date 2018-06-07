var express = require('express');
var router = express.Router();
var TeamTable = require('../database/team');

router.get('/:id', function(req, res) {
    let teamId = req.params.id;
    TeamTable.findById(teamId, function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

router.post('/', function(req, res){
    TeamTable.createTeam(req.body, function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

router.get('/', function(req, res) {
    TeamTable.getAllTeams(function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

module.exports = router;