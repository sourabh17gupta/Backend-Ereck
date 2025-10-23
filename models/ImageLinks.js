const mongoose = require("mongoose");

const ImageLink = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImageLink", ImageLink);
