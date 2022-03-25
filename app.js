require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// routes
const roomRouter = require("./routes/room");
const amenityRouter = require("./routes/amenities");
const reservationRouter = require("./routes/reservation");

// error router
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// db connection
const connectDB = require("./db/connectDB");

// json
app.use(express.json());
// app.use(express.static("./public"));

// routers
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/amenities", amenityRouter);
app.use("/api/v1/reservation", reservationRouter);

// error routes
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  // connect to DB
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
