
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
var values = process.argv.slice(2)

knex.insert({first_name: values[0], last_name: values[1], birthdate: values[2]})
.into('famous_people')
.then(function() {
 return {inserted: true};
 console.log("ADDED");
  knex.destroy();
})
.catch(function(error) {
 console.error(error);
});