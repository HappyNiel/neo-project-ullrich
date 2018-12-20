var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var UserTable = function () {};

UserTable.prototype.findUserByDiscordId = function (discordID, cb){
    console.log(`Formula:  {Discord} = '${discordID}'`);
    base('User').select({
        filterByFormula: `{Discord} = '${discordID}'`,
        maxRecords: 1
    }).firstPage(function page(err, records){
        if(err){ console.error(err); cb(null, err);}

        console.log(records[0]);
        cb(records[0]);
    });
}

UserTable.prototype.findOrCreateUserByDiscordId = function (discordId, discordAuth, cb){
    console.log(`Discord auth: ${discordAuth}`);
    base('User').select({
        filterByFormula: `{Discord} = '${discordId}'`,
        maxRecords: 1
    }).firstPage(function page(err, records){
        if(err){ console.error(err); cb(null, err); return; }

        if(records.length == 0){
            console.log('Creating user');
            base('User').create({
				"Discord": discordAuth.id,
				"DiscordUsername": discordAuth.username,
                "Email": discordAuth.email,
                "AccessToken": discordAuth.accessToken
            }, function (err, record){
                if(err){ console.error(err); cb(null, err);}
                console.log(record);
                cb(record);
                return;
            })
        }else{
            console.log(records[0]);
            cb(records[0]);
            return;
        }
    });
}

UserTable.prototype.findById = function (id, cb){
    console.log(`Finding user with ID: ${id}`);
    base('User').find(id, function(err, record) {
        if (err) { console.error(err); cb(err, null); return; }
        console.log(record);
        cb(null, record);
        return;
    });
}

UserTable.prototype.getAllUsers = function(cb){
    let allUsers = [];
    base('User').select({}).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('TeamID'));
            allUsers.push(record);
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
        cb(null, allUsers);
    });
}

module.exports = new UserTable();