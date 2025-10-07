const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true, 
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", 
    required: false, 
  },

  images: [
    {
      url: { type: String, required: true },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }
  ],

  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
