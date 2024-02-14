import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    discount: {
      type: Number,
      required: true,
    },
    expire: Date,
    code: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("copon", schema);
