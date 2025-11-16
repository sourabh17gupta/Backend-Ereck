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
      unique: true, // only email must be unique
      index: true,
    },
    InstagramId: {
      type: String,
      index: true,
      default: null, // optional field
    },
    LinkdinId: {
      type: String,
      index: true,
      default: null, // optional field
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
    Year: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
