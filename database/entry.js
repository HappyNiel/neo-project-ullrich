var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var EntryTable = function () {};

EntryTable.prototype.findByTeam = function (teamID, cb){
    //just send in the AirTable record ID for the team
    console.log(`Finding entries for team with ID: ${teamID}`);
    var entries = []
    base('Entry').select({
        filterByFormula: `{TeamID} = '${teamID}'`
    }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record) {
            console.log('Retrieved', record.get('EntryID'));
            entries.push(record);
        });
        fetchNextPage();
    }, function done(err){
        if(err){ console.error(err); cb(err); }

        cb(null, entries);
    });
}

EntryTable.prototype.findEntryByID = function (entryID, cb){
    //just send in the AirTable record ID for the team
    console.log(`Finding entry ID: ${entryID}`);
    base('Entry').find(entryID, function(err, record) {
        if (err) { console.error(err); cb(err, null); }
        console.log(record);
        cb(null, record);
    });
}

EntryTable.prototype.createEntry = function(teamID, entry, cb){
    //set the team for the entry
    entry.Team = teamID
    base('Entry').create(entry, function(err, record) {
        if (err) { console.error(err); cb(err, null); }
        console.log(`Entry created: record.getId()`);
        cb(null, record);
    });
}

module.exports = new EntryTable();