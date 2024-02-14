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
    image: String,
  },
  { timestamps: true }
);

schema.post("init", (doc) => {
  if (doc.image) doc.image = process.env.BASE_URL + doc.image;
});

export const brandModel = mongoose.model("brand", schema);
