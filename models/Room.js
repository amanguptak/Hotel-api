import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumbers: [{
    number: {
      type: Number,
      required: true,
    },
    unavailableDates: {
      type: [Date],
      default: [],
    },
  }],
  desc: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Room", RoomSchema);
