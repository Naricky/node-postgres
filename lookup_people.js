const pg = require("pg");
const settings = require("./settings"); // settings.json
var args = process.argv.slice(2)

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const Name = args[0];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1::varchar or first_name =$1::varchar", [Name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...")
    console.log("Found " + result.rows.length + " person(s) by the name " + Name);
    console.log(result.rows[0].id, ":", result.rows[0].first_name, result.rows[0].last_name, ",born ", result.rows[0].birthdate)
    client.end();
  });
});