import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dqsft2hpk",
  api_key: "782892116689386",
  api_secret: "uUU27TRKkF8mB4CnmvBLwuXWNwQ",
});

export const uploadImage = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'vistamart', // You can change the folder name
    });
    return result.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};
