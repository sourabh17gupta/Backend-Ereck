const TeamData = require("../models/TeamMemberSchema");
const uploadImage = require("../utils/imageUpload");

exports.teamData = async (req, res) => {
  try {
    const { name, email, InstagramId, LinkdinId, Position, TeamName, Year } = req.body;

    // Validate required fields
    if (!name || !email || !Position || !TeamName || !Year) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check for duplicate email only
    const existingMember = await TeamData.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: "Member already exists with this email",
      });
    }

    // Check for image upload
    const file = req.files?.Image;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Upload image
    const urls = await uploadImage(file, "Ereck");
    if (!urls) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Create member
    const response = await TeamData.create({
      name: name.trim(),
      email: email.trim(),
      InstagramId: InstagramId?.trim() || null,
      LinkdinId: LinkdinId?.trim() || null,
      Position: Position.trim(),
      TeamName: TeamName.trim(),
      Image: urls.url,
      Year: Year.trim(),
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

exports.getTeam = async (req, res) => {
  try {
    const { TeamName } = req.params;

    if (!TeamName) {
      return res.status(400).json({
        success: false,
        message: "Team name is required",
      });
    }

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
