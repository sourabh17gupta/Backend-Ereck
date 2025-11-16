const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      index: true, // keep index for search
    },
    email: {
      type: String, 
      required: true,
      unique: true, // unique email
      index: true,
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
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
