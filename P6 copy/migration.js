//import sqlite library
const sqlite3 = require('sqlite3');
//new database instance??
const db = new sqlite3.Database('./database.sqlite');

db.serialize(()=> {
db.run('DROP TABLE IF EXISTS Artist');
db.run('CREATE TABLE Artist(id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, date_of_birth TEXT NOT NULL, biography TEXT NOT NULL, is_currently_employed INT DEFAULT 1)');
});
