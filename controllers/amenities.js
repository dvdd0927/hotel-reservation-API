const Amenities = require("../models/Amenities");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { uploadMultipleImage } = require("../utils/file-upload");

const getAllAmenities = async (req, res) => {
  const amenityData = await Amenities.find({});

  if (!amenityData) {
    res.status(StatusCodes.NOT_FOUND).json("No Amenity Found");
  }

  res.status(StatusCodes.OK).json(amenityData);
};

const getSingleAmenity = async (req, res) => {
  const amenityData = await Amenities.findOne({ _id: req.params.id });

  if (!amenityData) {
    throw new CustomError.NotFoundError("No amenity found");
  }

  res.status(StatusCodes.OK).json(amenityData);
};

const createAmenity = async (req, res) => {
  if (req.files == false) {
    throw new CustomError.BadRequestError("Please upload image");
  }

  // upload images
  const images = await uploadMultipleImage(req.files);

  // get the image URLs
  const imageURLs = images.map((image) => image.imageURL);
  req.body.amenityImages = imageURLs;

  const amenityData = await Amenities.create(req.body);
  res.status(StatusCodes.CREATED).json(amenityData);
};

const updateAmenity = async (req, res) => {
  const amenityID = req.params.id;
  const oldAmenityData = await Amenities.findOne({ _id: amenityID });

  if (!oldAmenityData) {
    throw new CustomError.NotFoundError("No amenity found");
  }

  if (req.files.length !== 0) {
    // upload images
    const images = await uploadMultipleImage(req.files);

    // get the image URLs
    const imageURLs = images.map((image) => image.imageURL);
    req.body.amenityImages = imageURLs;
  }

  const newData = await Amenities.findOneAndUpdate(
    { _id: amenityID },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(newData);
};

const deleteAmenity = async (req, res) => {
  const amenityID = req.params.id;

  const deleteData = await Amenities.findOneAndDelete({ _id: amenityID });

  if (!deleteData) {
    throw new CustomError.NotFoundError("No amenity found");
  }

  res.status(StatusCodes.OK).json(deleteData);
};

module.exports = {
  getAllAmenities,
  getSingleAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
};
