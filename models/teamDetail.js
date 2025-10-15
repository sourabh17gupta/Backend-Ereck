const mongoose = require("mongoose");

const TeamDetailSchema = new mongoose.Schema({
  teamName:{
      type:String,
      enum:["managment","design","contentwriting","core"],
      required:true,
      unique:true
  },
  description:{
      type:String,
      required:true,
  }
  
}, { timestamps: true });


module.exports = mongoose.model("teamDetail", TeamDetailSchema);