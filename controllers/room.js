const Room = require("../models/Room");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const multer = require("multer");
const path = require("path");
const deleteUploadFiles = require("../utils/delete-files");
const { findOneAndRemove } = require("../models/Room");

const getAllRooms = async (req, res) => {
  const roomData = await Room.find({});
  // roomData.map((data) => console.log(data.roomImages));
  res.status(StatusCodes.OK).json(roomData);
};

const getSingleRoom = async (req, res) => {
  const roomID = req.params.id;
  const roomData = await Room.findOne({ _id: roomID });

  if (!roomData) {
    throw new CustomError.NotFoundError("No room data found");
  }

  res.status(StatusCodes.OK).json(roomData);
};

const createRoom = async (req, res, err) => {
  if (req.files == false) {
    throw new CustomError.BadRequestError("Please upload image");
  }

  const imageFiles = req.files.map((files) => {
    return files.path;
  });

  req.body.roomImages = imageFiles;

  const roomData = await Room.create(req.body);
  res.status(StatusCodes.CREATED).json(roomData);
};

const updateRoom = async (req, res) => {
  const roomID = req.params.id;
  const oldRoomData = await Room.findOne({ _id: roomID });

  if (!oldRoomData) {
    throw new CustomError.NotFoundError("No room data found");
  }

  if (!(req.files == false)) {
    // delete old files
    oldRoomData.roomImages.map((file) => {
      deleteUploadFiles(file);
    });

    // get the files
    const imageFiles = req.files.map((files) => {
      return files.path;
    });

    req.body.roomImages = imageFiles;
  }

  const newRoomData = await Room.findOneAndUpdate({ _id: roomID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.CREATED).json(newRoomData);
};

const deleteRoom = async (req, res) => {
  const roomID = req.params.id;
  const { roomImages } = await Room.findOne({ _id: roomID });

  const deleteData = await Room.findOneAndRemove({ _id: roomID });

  if (!deleteData) {
    throw new CustomError.NotFoundError("No room data found");
  }

  roomImages.map((file) => {
    deleteUploadFiles(file);
  });

  res.status(StatusCodes.OK).json(deleteData);
};

module.exports = {
  getAllRooms,
  getSingleRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
