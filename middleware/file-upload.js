const multer = require("multer");
const path = require("path");
const CustomError = require("../errors");

// const filePath = path.join(__dirname, "../public/uploads/");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
      cb(new CustomError.BadRequestError("Please upload image file"));
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
