// import mysql
const mysql = require("mysql");

// import dotenv
require("dotenv").config();

// memisahkan environment
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// create connection
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

// konek ke database
db.connect((err) => {
    if (err) throw err;
    console.log("Berhasil terkoneksi ke database");
});

// export connection
module.exports = db;
