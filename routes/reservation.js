const router = require("express").Router();

const {
  getAllReservation,
  getSingleReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation");

router.route("/").get(getAllReservation).post(createReservation);
router
  .route("/:id")
  .get(getSingleReservation)
  .patch(updateReservation)
  .delete(deleteReservation);

module.exports = router;
