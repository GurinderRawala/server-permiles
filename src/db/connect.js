const mysql = require('mysql')
const env = require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = db