const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    phoneNo: {
      type: Number,
      required: true,
      index: true,
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["admin", "user"],
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
