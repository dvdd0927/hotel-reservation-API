const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: [true, "Please provide room name"],
    maxLength: 50,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  availability: {
    type: String,
    enum: ["Available", "Not Available"],
    default: "Available",
  },
  roomType: {
    type: String,
    enum: ["small", "medium", "large"],
    required: [true, "Please provide room type"],
  },
  roomPrice: {
    type: Number,
    required: [true, "Please provide room price"],
  },
  roomImages: {
    type: Array,
  },
});

// RoomSchema.methods.uploadImage = async ()

module.exports = mongoose.model("Room", RoomSchema);
