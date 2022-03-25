const router = require("express").Router();
const uploadPhoto = require("../middleware/file-upload");

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
  .post(uploadPhoto.array("amenityImages[]"), createAmenity);
router
  .route("/:id")
  .get(getSingleAmenity)
  .patch(uploadPhoto.array("amenityImages[]"), updateAmenity)
  .delete(deleteAmenity);

module.exports = router;
