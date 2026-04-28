import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Slot", slotSchema);
