import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  CheckOut: Number,
  maxGuest: Number
});

export const placeModel = mongoose.model("Place", placeSchema);
