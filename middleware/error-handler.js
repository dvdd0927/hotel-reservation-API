const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const deleteUploadFiles = require("../utils/delete-files");

const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;

    if (req.files) {
      const imageFiles = req.files.map((files) => {
        return files.path;
      });

      imageFiles.map((file) => deleteUploadFiles(file));
    }
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;

    const imageFiles = req.files.map((files) => {
      return files.path;
    });

    imageFiles.map((file) => deleteUploadFiles(file));
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
