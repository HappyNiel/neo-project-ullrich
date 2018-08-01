var express = require('express');
var router = express.Router();
var TeamTable = require('../database/team');
var EntryTable = require('../database/entry');
var DriverTable = require('../database/driver');

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
    //this will create an NPE if nobody is logged in
    //should probably wrap these functions in something to check for a logged in user first
    auth_user = req.user
    team = req.body
    //assign the currently logged in user as the manager by default
    team.Manager = [auth_user.airtableId]

    TeamTable.createTeam(team, function(err, record){
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

//Team Entries
router.get('/:id/entry', function(req, res) {
    let teamId = req.params.id;
    EntryTable.findByTeam(teamId, function(err, records){
        if(err){
            console.log(`Error is ${err}`)
            console.error(err);
            //send back error response
            throw err;
        }
        res.status(200).send(records);
    })
});

router.post('/:id/entry', function(req, res){
    EntryTable.createEntry(req.params.id, req.body, function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

//Entry Drivers
router.get('/:teamId/entry/:entryId/drivers', function(req, res) {
    let entryId = req.params.entryId;
    DriverTable.findByEntry(entryId, function(err, records){
        if(err){
            console.log(`Error is ${err}`)
            console.error(err);
            //send back error response
            throw err;
        }
        res.status(200).send(records);
    })
});

router.post('/:teamId/entry/:entryId/drivers', function(req, res){
    DriverTable.createEntry(req.params.entryId, req.body, function(err, record){
        if(err){
            //send back error response
            throw err;
        }
        res.status(200).send(record);
    })
});

//Team Drivers
router.get('/:teamId/drivers', function(req, res) {
    let teamId = req.params.teamId;
    DriverTable.findByTeam(teamId, function(err, records){
        if(err){
            console.log(`Error is ${err}`)
            console.error(err);
            //send back error response
            throw err;
        }
        res.status(200).send(records);
    })
});


module.exports = router;