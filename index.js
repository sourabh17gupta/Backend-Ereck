const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "https://ereck-frontend.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp',
}));
// const route = require("./routes/route");

// app.use("/api/v1",route);

const connectwithDb = require('./config/Database');
connectwithDb();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const route=require("./routes/routes");
app.use('/api/v1',route);

app.listen(3000, ()=>{
    console.log("APP is running");
})
