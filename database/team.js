var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var TeamTable = function () {};

TeamTable.prototype.findById = function (id){
    return new Promise((resolve, reject) => {
        base('Team').find(id, function(err, record) {
            if (err) { console.error(err); return reject(err); }
            return resolve(record);
        });
    });
}

TeamTable.prototype.createTeam = function(team){
    return new Promise((resolve, reject) => {
        base('Team').create(team, function(err, record) {
            if (err) { console.error(err); return reject(err); }
            console.log(`Team created: record.getId()`);
            resolve(record);
        });
    });
}

TeamTable.prototype.getAllTeams = function(user){
    let allTeams = [];
    let select = {};

    if (!user.isAdmin){
        select = {
            filterByFormula: `{Manager} = '${user.airtableId}'`
        };
    }

    return new Promise((resolve, reject) => {
        base('Team').select(select).eachPage(function page(records, fetchNextPage) {
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
                return reject(err);
            }
            return resolve(allTeams);
        });
    });
}

module.exports = new TeamTable();