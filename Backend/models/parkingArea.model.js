import mongoose from "mongoose";

const parkingAreaSchema = new mongoose.Schema(
  {
    parkingName: {
      type: String,
      required: true,
      trim: true,
    },

    parkingCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    operatingHours: {
      open: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("ParkingArea", parkingAreaSchema);
