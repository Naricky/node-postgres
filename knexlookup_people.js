const settings = require("./settings");
var knex = require('knex')({
 client: 'pg',
 connection: {
   host: settings.hostname,
   user: settings.user,
   password : settings.password,
   database : settings.database
 }
});
var args = process.argv.slice(2)
const Name = args[0];

knex.select('*')
.from('famous_people')
.where('last_name', Name)
.orWhere('first_name', Name)
.then(function (rows) {
  console.log("Searching...")
  console.log("Found " + rows.length + " person(s) by the name " + Name);
  if (rows.length) {
    console.log(rows[0].id, ":", rows[0].first_name, rows[0].last_name, ",born ", rows[0].birthdate)
  }
})
.catch(function(error) {
  console.error(error)
});

