import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "name is required"],
      minlength: [2, "Too short name"],
      maxlength: [50, "Too long name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("category");
});

export const subcategoryModel = mongoose.model("subcategory", schema);
