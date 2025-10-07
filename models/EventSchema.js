const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
     type: String 
  },
  date: { 
    type: Date
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
},
  fields: [
    {
      name: { type: String, required: true },
      type: { type: String, enum: ["text", "number", "email", "file", "select"], default: "text" },
      required: { type: Boolean, default: false },
      options: [String],
    }
  ],
  bannerImage: { 
    type: String
 },

  gallery: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Gallery"
 }

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
