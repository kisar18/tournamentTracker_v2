import mongoose, { Schema } from "mongoose";

const prizeSchema = mongoose.Schema({
  prizeName: String,
  placeNumber: Number,
  placeName: String,
  prizeAmount: Number,
  prizePercentage: Number,
});

export default mongoose.model("Prize", prizeSchema);