const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "almleoc",
  api_key: "651949951378585",
  api_secret: "4RvD0OKF7JsmhokH_ah90VR8tY8",
});

module.exports = cloudinary;
