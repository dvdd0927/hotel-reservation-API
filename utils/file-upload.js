// const multer = require("multer");
// const path = require("path");
// const CustomError = require("../errors");

// // const filePath = path.join(__dirname, "../public/uploads/");

// const storage = multer.diskStorage({
//   destination: "public/uploads",
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image")) {
//       cb(new CustomError.BadRequestError("Please upload image file"));
//       cb(null, false);
//     } else {
//       cb(null, true);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

// module.exports = upload;

const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../db/firebase");

const uploadSingleImage = async (imageFile) => {
  try {
    const imageName = `${Date.now()}${imageFile.originalname.split(".")[0]}`;

    const storageRef = ref(storage, "hotelReservationImages/" + imageName);

    const uploadTask = await uploadBytesResumable(
      storageRef,
      imageFile.buffer,
      {
        contentType: imageFile.mimetype,
      }
    );

    const imageURL = await getDownloadURL(uploadTask.ref);

    return { imageURL, imageName };
  } catch (error) {
    // handles unsuccessful upload
    console.log(error);
  }
};

const uploadMultipleImage = async (imageFile) => {
  try {
    const images = imageFile.map(async (image) => {
      const imageName = `${Date.now()}${image.originalname.split(".")[0]}`;

      const storageRef = ref(storage, "hotelReservationImages/" + imageName);

      const uploadTask = await uploadBytesResumable(storageRef, image.buffer, {
        contentType: image.mimetype,
      });

      const imageURL = await getDownloadURL(uploadTask.ref);

      return { imageURL, imageName };
    });
    return Promise.all(images);
  } catch (error) {
    // handles unsuccessful upload
    console.log(error);
  }
};

module.exports = { uploadSingleImage, uploadMultipleImage };
