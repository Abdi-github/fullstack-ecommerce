import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
      minlength: [2, "Too short characters"],
      maxlength: [32, "Too long characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },

  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
