const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;



app.use(express.json());
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

const Upload=require("./routes/routes");
app.use('/api/v1/upload',Upload);

app.listen(3000, ()=>{
    console.log("APP is running");
})