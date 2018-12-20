var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var TeamTable = function () {};

TeamTable.prototype.findById = function (id, done){
    console.log(`Finding team with ID: ${id}`);
    base('Team').find(id, function(err, record) {
        if (err) { console.error(err); done(err, null); return; }
        console.log(record);
        done(null, record);
    });
}

TeamTable.prototype.createTeam = function(team, cb){
    base('Team').create(team, function(err, record) {
        if (err) { console.error(err); cb(err, null); return; }
        console.log(`Team created: record.getId()`);
        cb(null, record);
    });
}

TeamTable.prototype.getAllTeams = function(cb){
    let allTeams = [];
    base('Team').select({}).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('TeamID'));
            allTeams.push(record);
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { 
            console.error(err);
            cb(err, null); 
            return;
        }
        cb(null, allTeams);
    });
}

module.exports = new TeamTable();