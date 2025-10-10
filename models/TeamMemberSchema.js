const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name:{ 
    type: String, 
    required: true
  },

  email:{
    type: String, 
    required: true,
    unique: true 
  },

  InstagramId:{
   type:String,
   unique:true,
  },

  LinkdinId:{
   type:String,
   unique:true
  },

  Position:{
    type: String, 
    required: true 
  },
  
  TeamName:{
      type:String,
      enum:["managment","design","contentwriting","core"],
      required:true
  },

  Image:{
    type:String,
  },
  
}, { timestamps: true });


module.exports = mongoose.model("TeamMember", TeamMemberSchema);