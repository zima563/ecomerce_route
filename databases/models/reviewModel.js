import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      minlength: [0, "Too short text"],
      maxlength: [1500, "Too long text"],
    },
    rate: {
      type: Number,
      min: [0, "rate must allowed equal or greater than 0"],
      max: [5, "rate must allowed equal or below than 5"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("user", "name");
});
export const reviewModel = mongoose.model("review", schema);
