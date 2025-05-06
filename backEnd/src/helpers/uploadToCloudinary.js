const cloudinary = require("../lib/cloudinary");

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`Error uploading file to Cloudinary. ${error}`);
    throw new Error("Error uploading file to Cloudinary.");
  }
};
module.exports = {
  uploadToCloudinary,
};
