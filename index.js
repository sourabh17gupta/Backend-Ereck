const express = require("express");
const app = express();
const cors = require('cors');


require("dotenv").config();

const PORT = process.env.PORT || 3000;



app.use(express.json());

const route = require("./router/route");

app.use("/api/v1",route);

const connectwithDb = require('./config/Database');
connectwithDb();


app.listen(3000, ()=>{
    console.log("APP is running");
})