const cloudinary = require("cloudinary").v2;

// Upload image and return secure URL
async function uploadImage(file, folder) {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder,
    });
    return { url: result.secure_url }; // always HTTPS
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
}

// Upload file with optional quality
async function uploadFileToCloudinary(file, folder, quality) {
  try {
    const options = { folder, resource_type: "auto" };
    if (quality) options.quality = quality;

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return { url: result.secure_url }; // always HTTPS
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
}

module.exports = { uploadImage, uploadFileToCloudinary };
