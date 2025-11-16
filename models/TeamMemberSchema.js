const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true, // unique email
      trim: true,
      index: true,
    },
    InstagramId: {
      type: String,
      default: null, // duplicates allowed
      trim: true,
    },
    LinkdinId: {
      type: String,
      default: null, // duplicates allowed
      trim: true,
    },
    Position: {
      type: String, 
      required: true,
      trim: true,
      index: true,
    },
    TeamName: {
      type: String,
      enum: ["managment", "design", "contentwriting", "core"],
      required: true,
      trim: true,
      index: true,
    },
    Image: {
      type: String,
    },
    Year: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
