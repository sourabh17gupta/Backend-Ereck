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


//teamData
const {teamData}=require("../controllers/teamData");
route.post("/teamdata",teamData)

//contact 
const {createContact,getAllContacts,getContactById,deleteContact}=require("../controllers/contactController");
route.post("/createContact",createContact);
route.get("/getAllContacts",getAllContacts);
route.get("/getContactById",getContactById);
route.delete("/deleteContact",deleteContact);

//teamDetail
const {createTeamDescription,getTeamDetails}=require("../controllers/teamController");
route.post("/createTeamDescription",createTeamDescription);
route.get("/getTeamDetails/:teamName",getTeamDetails);

module.exports=route;