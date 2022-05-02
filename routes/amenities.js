const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {
  getAllAmenities,
  getSingleAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenities");

router
  .route("/")
  .get(getAllAmenities)
  .post(upload.array("amenityImages[]"), createAmenity);
router
  .route("/:id")
  .get(getSingleAmenity)
  .patch(upload.array("amenityImages[]"), updateAmenity)
  .delete(deleteAmenity);

module.exports = router;
