const TeamData = require("../models/TeamMemberSchema");
const { uploadImage } = require("../utils/imageUpload");

// Add new team member
exports.teamData = async (req, res) => {
  try {
    const { name, email, InstagramId, LinkdinId, Position, TeamName, Year } = req.body;

    // Validate required fields
    if (!name || !email || !Position || !TeamName || !Year) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Check email uniqueness
    const existingMember = await TeamData.findOne({ email }).lean();
    if (existingMember) {
      return res.status(409).json({ success: false, message: "Member already exists with this email" });
    }

    // Optional: Check InstagramId uniqueness if provided
    const instagramValue = InstagramId?.trim() || null;
    if (instagramValue) {
      const existingInstagram = await TeamData.findOne({ InstagramId: instagramValue }).lean();
      if (existingInstagram) {
        return res.status(409).json({ success: false, message: "Member already exists with this InstagramId" });
      }
    }

    const file = req.files?.Image;
    if (!file) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    // Upload image to Cloudinary
    const urls = await uploadImage(file, "Ereck");
    if (!urls) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    // Create team member
    const response = await TeamData.create({
      name,
      email,
      InstagramId: instagramValue,
      LinkdinId: LinkdinId?.trim() || null,
      Position,
      TeamName,
      Image: urls.url,
      Year,
    });

    res.status(200).json({ success: true, message: "Data submitted successfully", data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all members of a specific team
exports.getTeam = async (req, res) => {
  try {
    const { TeamName } = req.params;
    if (!TeamName) return res.status(400).json({ success: false, message: "Team name is required" });

    const teamMembers = await TeamData.find({ TeamName }).lean();
    res.status(200).json({ success: true, data: teamMembers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get data", error: error.message });
  }
};
