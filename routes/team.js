var express = require('express');
var router = express.Router();
var TeamTable = require('../database/team');

router.get('/:id', function(req, res, next) {
    let teamId = req.params.id;
    TeamTable.findById(teamId, function(err, record){
        if(err){
            //send back error response
            next(err);
        } else{
            res.status(200).send(record);
        }
        
    })
});

router.post('/', function(req, res, next){
    TeamTable.createTeam(req.body, function(err, record){
        if(err){
            //send back error response
            next(err);
        }else{
            res.status(200).send(record);
        }
        
    })
});

router.get('/', function(req, res, next) {
    TeamTable.getAllTeams(function(err, record){
        if(err){
            //send back error response
            next(err);
        } else{
            res.status(200).send(record);
        }
        
    })
});

module.exports = router;