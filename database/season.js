var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var SeasonTable = function () {};

SeasonTable.prototype.getSeasons = function(cb){
    let allSeasons = [];
    base('Season').select({}).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            allSeasons.push(record);
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
        cb(null, allSeasons);
    });
}

module.exports = new SeasonTable();