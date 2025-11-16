async function uploadImage(file, Folder) {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    resource_type: "auto",
    folder: Folder,
  });
  return { url: result.secure_url }; // <-- always HTTPS
}

module.exports = uploadImage;
