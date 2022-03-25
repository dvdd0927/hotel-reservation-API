const fs = require("fs");
const CustomError = require("../errors");

const deleteFiles = async (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw new CustomError.BadRequestError(`File: ${path} doesn't exist`);
    }
  });
};

module.exports = deleteFiles;
