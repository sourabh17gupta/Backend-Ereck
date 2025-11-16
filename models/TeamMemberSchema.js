const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true, // unique email
    },
    InstagramId: {
      type: String,
      default: null, // optional, default null
    },
    LinkdinId: {
      type: String,
      default: null, // optional, default null
    },
    Position: {
      type: String, 
      required: true,
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
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
