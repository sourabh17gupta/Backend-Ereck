exports.teamData = async (req, res) => {
  try {
    const { name, email, InstagramId, LinkdinId, Position, TeamName, Year } = req.body;

    if (!name || !email || !Position || !TeamName || !Year) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check email uniqueness only
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
      InstagramId: InstagramId?.trim() || null,
      LinkdinId: LinkdinId?.trim() || null,
      Position,
      TeamName,
      Image: urls.url,
      Year,
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
