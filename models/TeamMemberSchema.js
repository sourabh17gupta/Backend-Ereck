const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      index: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true,
      index: true,
    },
    InstagramId: {
      type: String,
      index: true,
    },
    LinkdinId: {
      type: String,
      index: true,
    },
    Position: {
      type: String, 
      required: true,
      index: true,
    },
    TeamName: {
      type: String,
      enum: ["managment", "design", "contentwriting", "core"],
      required: true,
      index: true,
    },
    Image: {
      type: String,
    },
    Year:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
