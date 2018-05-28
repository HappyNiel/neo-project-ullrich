var Airtable = require('airtable')
var base = Airtable.base(process.env.AIRTABLE_BASE);


var UserTable = function () {};

UserTable.prototype.findUserById = function (discordID, done){
    console.log(`Formula:  {Discord} = '${discordID}'`);
    base('User').select({
        filterByFormula: `{Discord} = '${discordID}'`,
        maxRecords: 1
    }).firstPage(function page(err, records){
        if(err){ console.error(err); done(null, err);}

        console.log(records[0]);
        done(records[0]);
    });
}

UserTable.prototype.findOrCreateUserById = function (discordId, discordAuth, done){
    console.log(`Discord auth: ${discordAuth}`);
    base('User').select({
        filterByFormula: `{Discord} = '${discordId}'`,
        maxRecords: 1
    }).firstPage(function page(err, records){
        if(err){ console.error(err); done(null, err);}

        if(records.length == 0){
            console.log('Creating user');
            base('User').create({
                // "Name": discordAuth.username,
                "Discord": discordAuth.id,
                "Email": discordAuth.email,
                "AccessToken": discordAuth.accessToken
            }, function (err, record){
                if(err){ console.error(err); done(null, err);}
                console.log(record);
                done(record);
            })
        }else{
            console.log(records[0]);
            done(records[0]);
        }
    });
}

module.exports = new UserTable();