const express=require("express");
const route=express.Router();


//image link genrator
const {imageUpload} =require("../controllers/fileUpload");
route.post("/imageUpload",imageUpload);

//Auth
const {generateOTP, signup, login} = require("../controllers/authController");
route.post("/generateotp", generateOTP);
route.post("/signup", signup);
route.post("/login", login);

//reset password 
const {resetPasswordLink, resetPassword} =  require("../controllers/resetPassword");
route.post("/resetpassword", resetPasswordLink);
route.post("/resetpassword/:token", resetPassword);
module.exports=route;