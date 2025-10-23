const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
