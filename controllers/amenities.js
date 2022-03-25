const Amenities = require("../models/Amenities");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const deleteUploadFiles = require("../utils/delete-files");

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

  const imageFiles = req.files.map((file) => {
    return file.path;
  });

  req.body.amenityImages = imageFiles;

  const amenityData = await Amenities.create(req.body);
  res.status(StatusCodes.CREATED).json(amenityData);
};

const updateAmenity = async (req, res) => {
  const amenityID = req.params.id;
  const oldAmenityData = await Amenities.findOne({ _id: amenityID });

  if (!oldAmenityData) {
    throw new CustomError.NotFoundError("No amenity found");
  }

  if (!(req.files == false)) {
    oldAmenityData.amenityImages.map((data) => deleteUploadFiles(data));

    const imageFiles = req.files.map((file) => {
      return file.path;
    });

    req.body.amenityImages = imageFiles;
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
  const oldData = await Amenities.findOne({ _id: amenityID });

  const deleteData = await Amenities.findOneAndDelete({ _id: amenityID });

  if (!deleteData) {
    throw new CustomError.NotFoundError("No amenity found");
  }

  oldData.amenityImages.map((file) => deleteUploadFiles(file));

  res.status(StatusCodes.OK).json(deleteData);
};

module.exports = {
  getAllAmenities,
  getSingleAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
};
