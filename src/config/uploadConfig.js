const multer = require("multer");

module.exports = {
  storage: new multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/uploads/");
    },
    filename: function (request, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
