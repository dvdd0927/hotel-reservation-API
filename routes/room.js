const express = require("express");
const router = express.Router();
const uploadPhoto = require("../middleware/file-upload");

const {
  getAllRooms,
  getSingleRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room");

router
  .route("/")
  .get(getAllRooms)
  .post(uploadPhoto.array("roomImages[]"), createRoom);
router
  .route("/:id")
  .get(getSingleRoom)
  .patch(uploadPhoto.array("roomImages[]"), updateRoom)
  .delete(deleteRoom);

module.exports = router;
