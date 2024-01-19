// meng import express
const express = require("express");
const app = express();

// import routes dari routes/api.js
const api = require("./routes/api");

// pakai middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", api);

// listen to port
const port = 8080 || 3000;
app.listen(8080, () => console.log(`Server jalan di ${port}`));
