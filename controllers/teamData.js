const mongoose = require("mongoose");
const TeamData = require("../models/TeamMemberSchema");
const uploadImage = require("../utils/imageUpload");

exports.teamData = async (req, res) => {
  try {
    console.log("hi");
    const { name, email, InstagramId, LinkdinId, Position, TeamName } = req.body;
    console.log(email)

    if (!name || !email || !Position || !TeamName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingMember = await TeamData.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: "Member already exists with this email",
      });
    }

    const file = req.files?.Image;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const urls = await uploadImage(file, "Ereck");
    if (!urls) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const response = await TeamData.create({
      name,
      email,
      InstagramId,
      LinkdinId,
      Position,
      TeamName,
      Image: urls.url
    });

    return res.status(200).json({
      success: true,
      message: "Data submitted successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
