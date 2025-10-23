const mongoose = require("mongoose");
const TeamData = require("../models/TeamMemberSchema");
const uploadImage = require("../utils/imageUpload");

exports.teamData = async (req, res) => {
  try {
    const { name, email, InstagramId, LinkdinId, Position, TeamName,year } = req.body;

    if (!name || !email || !Position || !TeamName || !year) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Use indexed email field for quick existence check
    const existingMember = await TeamData.findOne({ email }).lean();
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
      Image: urls.url,
      year,
    });

    return res.status(200).json({
      success: true,
      message: "Data submitted successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all members of a specific team using indexed TeamName
exports.getTeam = async (req, res) => {
  try {
    const { TeamName } = req.params;

    if (!TeamName) {
      return res.status(400).json({
        success: false,
        message: "Team name is required",
      });
    }

    // Indexed query for O(log n) lookup by TeamName
    const teamMembers = await TeamData.find({ TeamName }).lean();

    res.status(200).json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get data",
      error: error.message,
    });
  }
};
