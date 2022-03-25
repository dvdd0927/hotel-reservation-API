const mongoDB = require("mongoose");

const connectDB = (url) => {
  return mongoDB.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
