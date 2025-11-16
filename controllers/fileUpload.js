const File = require("../models/ImageLinks");
const { uploadFileToCloudinary } = require("../utils/imageUpload");

// Supported image types
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// Upload image
exports.imageUpload = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.files?.imageFile;

    if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({ success: false, message: "File format not supported" });
    }

    const response = await uploadFileToCloudinary(file, "Ereck");
    if (!response) return res.status(500).json({ success: false, message: "File upload failed" });

    const fileData = await File.create({ name, url: response.url });

    res.json({ success: true, message: "Image successfully uploaded", url: response.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};
