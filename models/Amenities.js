const mongoose = require("mongoose");

const AmenitiesSchema = new mongoose.Schema({
  amenityName: {
    type: String,
    maxLength: 50,
    required: [true, "Please provide amenity name"],
    unique: true,
  },
  amenityImages: {
    type: Array,
  },
});

module.exports = mongoose.model("Amenities", AmenitiesSchema);
