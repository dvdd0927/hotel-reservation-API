const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const sendEmail = require("../utils/send-email");

const getAllReservation = async (req, res) => {
  const reservationData = await Reservation.find({});

  res.status(StatusCodes.OK).json(reservationData);
};

const getSingleReservation = async (req, res) => {
  const reservationData = await Reservation.findOne({ _id: req.params.id });

  if (!reservationData) {
    throw new CustomError.NotFoundError("No reservation found");
  }

  res.status(StatusCodes.OK).json(reservationData);
};

const createReservation = async (req, res) => {
  const { customerName, email, dateStart, dateEnd, roomID } = req.body;
  req.body.dateStart = Date.parse(dateStart);
  req.body.dateEnd = Date.parse(dateEnd);

  const reservationData = await Reservation.create(req.body);

  const { roomName, roomType, roomPrice } = await Room.findOne({ _id: roomID });

  const stayingDay = Math.floor(
    (req.body.dateEnd - req.body.dateStart) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = roomPrice * stayingDay;

  // send reservation confirmation to customer email
  const message = await sendEmail(
    email,
    "Hotel Reservation",
    `Hello, ${customerName},
    \n\nThis is the confirmation of your reservation:\n
    Room: ${roomName}\n
    Type: ${roomType}\n
    Price: ₱${roomPrice}/night\n
    Date: ${dateStart} - ${dateEnd}\n
    Total Price: ₱${totalPrice}`
  ).then(() => {
    return "Email Sent!";
  });

  await sendEmail(
    "villanueva0512345@gmail.com",
    "Hotel Reservation",
    `${customerName} reserved a room. RoomID: ${roomID}`
  );

  res.status(StatusCodes.CREATED).json({ reservationData, message: message });
};

const updateReservation = async (req, res) => {
  const reservationData = await Reservation.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!reservationData) {
    throw new CustomError.NotFoundError("No reservation found");
  }

  res.status(StatusCodes.OK).json(reservationData);
};

const deleteReservation = async (req, res) => {
  const reservationData = await Reservation.findOneAndDelete({
    _id: req.params.id,
  });

  if (!reservationData) {
    if (!reservationData) {
      throw new CustomError.NotFoundError("No reservation found");
    }

    res.status(StatusCodes.OK).json(reservationData);
  }

  res.status(StatusCodes.OK).json({ deletedData: reservationData });
};

module.exports = {
  getAllReservation,
  getSingleReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
