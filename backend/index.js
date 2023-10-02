require("dotenv").config({ path: "./config.env" });
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./api/route'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

