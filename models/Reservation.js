const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Please provide name"],
  },
  contact: {
    type: String,
    required: [true, "Please provide contact number"],
    maxLength: 11,
    minLength: 11,
  },
  email: {
    type: String,
    required: [true, "Please provide e-mail"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid e-mail",
    ],
  },
  dateStart: {
    type: Date,
    require: [true, "Please provide starting date"],
  },
  dateEnd: {
    type: Date,
    require: [true, "Please provide ending date"],
  },
  roomID: {
    type: String,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
