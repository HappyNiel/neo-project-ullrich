var express = require('express');
var router = express.Router();
var SeasonTable = require('../database/season');

router.get('/', function(req, res, next) {
    SeasonTable.getSeasons(function(err, record){
        if(err){
            next(err);
        } else {
            res.status(200).send(record);
        }
    })
});

module.exports = router;