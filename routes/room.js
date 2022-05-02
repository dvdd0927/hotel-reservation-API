const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

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
  .post(upload.array("roomImages[]"), createRoom);
router
  .route("/:id")
  .get(getSingleRoom)
  .patch(upload.array("roomImages[]"), updateRoom)
  .delete(deleteRoom);

module.exports = router;
