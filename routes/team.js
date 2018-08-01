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

router.post('/', function(req, res){
    //this will create an NPE if nobody is logged in
    //should probably wrap these functions in something to check for a logged in user first
    auth_user = req.user
    team = req.body
    //assign the currently logged in user as the manager by default
    team.Manager = [auth_user.airtableId]

    TeamTable.createTeam(team, function(err, record){
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