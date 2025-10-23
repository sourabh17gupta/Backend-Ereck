const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
      index: true,
    },
    images: [
      {
        url: { type: String, required: true },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
      }
    ],
    description: { 
      type: String 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
