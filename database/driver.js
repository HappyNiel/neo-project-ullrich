var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var DriverTable = function () {};

DriverTable.prototype.createDriver = function(entryID, driver, cb){
    //set the team for the entry
    driver.Entry = entryID
    base('Driver').create(driver, function(err, record) {
        if (err) { console.error(err); cb(err, null); return; }
        console.log(`Driver created: record.getId()`);
        cb(null, record);
    });
}

DriverTable.prototype.findByEntry = function (entryID, cb){
    //just send in the AirTable record ID for the team
    console.log(`Finding entries for entry with ID: ${entryID}`);
    var drivers = []
    base('Driver').select({
        filterByFormula: `{EntryID} = '${entryID}'`
    }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record) {
            console.log('Retrieved', record.get('EntryID'));
            drivers.push(record);
        });
        fetchNextPage();
    }, function done(err){
        if(err){ console.error(err); cb(err); return; }

        cb(null, drivers);
    });
}

DriverTable.prototype.findByTeam = function (teamID, cb){
    //just send in the AirTable record ID for the team
    console.log(`Finding entries for team with ID: ${teamID}`);
    var drivers = []
    base('Driver').select({
        filterByFormula: `{TeamID} = '${teamID}'`
    }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record) {
            console.log('Retrieved', record.get('EntryID'));
            drivers.push(record);
        });
        fetchNextPage();
    }, function done(err){
        if(err){ console.error(err); cb(err); return; }

        cb(null, drivers);
    });
}

module.exports = new DriverTable();