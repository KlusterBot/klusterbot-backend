let mysql = require("mysql");

require("dotenv").config({ path: "../.env" });
let host = process.env.HOST;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let database = process.env.DB_NAME;
let port = process.env.DB_PORT;

const connection = mysql.createPool({
    charset: "utf8mb4",
    host: host || "localhost",
    user: user || "root",
    password: password || "root",
    database: database || "kluster",
    connectionLimit: 100,
    port: port || "/var/run/mysqld/mysqld.sock", 
});

connection.getConnection((err) => {
    if (err) return console.log(err);
    console.log("DB CONNECTED");
});

module.exports = connection;
