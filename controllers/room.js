const Room = require("../models/Room");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { uploadMultipleImage } = require("../utils/file-upload");

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

const createRoom = async (req, res) => {
  if (req.files.length === 0) {
    throw new CustomError.BadRequestError("Please upload image");
  }

  // upload images
  const images = await uploadMultipleImage(req.files);

  // get the URLs
  const imagesURL = images.map((image) => image.imageURL);
  req.body.roomImages = imagesURL;

  // insert to database
  const roomData = await Room.create(req.body);
  res.status(StatusCodes.CREATED).json(roomData);
};

const updateRoom = async (req, res) => {
  const roomID = req.params.id;
  const oldRoomData = await Room.findOne({ _id: roomID });

  if (!oldRoomData) {
    throw new CustomError.NotFoundError("No room data found");
  }

  if (req.files.length !== 0) {
    // upload images
    const images = await uploadMultipleImage(req.files);

    // get the URLs
    const imagesURL = images.map((image) => image.imageURL);
    req.body.roomImages = imagesURL;
  }

  const newRoomData = await Room.findOneAndUpdate({ _id: roomID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.CREATED).json(newRoomData);
};

const deleteRoom = async (req, res) => {
  const roomID = req.params.id;

  const deleteData = await Room.findOneAndRemove({ _id: roomID });

  if (!deleteData) {
    throw new CustomError.NotFoundError("No room data found");
  }

  res.status(StatusCodes.OK).json(deleteData);
};

module.exports = {
  getAllRooms,
  getSingleRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
