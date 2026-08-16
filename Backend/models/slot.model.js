import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: String,
      required: true,
      trim: true,
    },
    parkingAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingArea",
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true },
);

// A slot number only needs to be unique within its parking area
slotSchema.index({ parkingAreaId: 1, slotNumber: 1 }, { unique: true });

export default mongoose.model("Slot", slotSchema);
