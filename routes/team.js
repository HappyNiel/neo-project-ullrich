var express = require('express');
var router = express.Router();
var TeamTable = require('../database/team');
var EntryTable = require('../database/entry');
var DriverTable = require('../database/driver');

router.get('/:id', async(req, res, next) => {
    let teamId = req.params.id;

    try{
        team = await TeamTable.findById(teamId);
        res.status(200).send(team);
    } catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    //this will create an NPE if nobody is logged in
    //should probably wrap these functions in something to check for a logged in user first
    auth_user = req.user
    team = req.body
    //assign the currently logged in user as the manager by default
    team.Manager = [auth_user.airtableId]

    try {
        team = await TeamTable.createTeam(team)
        res.status(200).send(team);
    } catch(err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try{
        teams = await TeamTable.getAllTeams(req.user)
        res.status(200).send(teams)
    } catch(err) {
        next(err);
    }
});

//Team Entries
router.get('/:id/entry', function(req, res, next) {
    let teamId = req.params.id;
    EntryTable.findByTeam(teamId, function(err, records){
        if(err){
            next(err);
        } else {
            res.status(200).send(records);
        }
    })
});

router.post('/:id/entry', function(req, res, next){
    EntryTable.createEntry(req.params.id, req.body, function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

//Entry Drivers
router.get('/:teamId/entry/:entryId/drivers', function(req, res, next) {
    let entryId = req.params.entryId;
    DriverTable.findByEntry(entryId, function(err, records){
        if(err){
            next(err);
        } else {
            res.status(200).send(records);
        }
    })
});

router.post('/:teamId/entry/:entryId/drivers', function(req, res, next){
    DriverTable.createEntry(req.params.entryId, req.body, function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

//Team Drivers
router.get('/:teamId/drivers', function(req, res, next) {
    let teamId = req.params.teamId;
    DriverTable.findByTeam(teamId, function(err, records){
        if(err){
            next(err);
        } else {
            res.status(200).send(records);
        }
    })
});

router.post('/:teamId/drivers', function(req, res, next){
    DriverTable.createDriver(null, req.body, function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

module.exports = router;