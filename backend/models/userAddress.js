import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      //  required: true
    },
    street: {
      type: String,
      //   required: true,
    },
    city: {
      type: String,
      //   required: true,
    },
    zipCode: {
      type: String,
      //   required: true,
    },

    country: {
      //   type: String,
      //   required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserAddress = mongoose.model("UserAddress", userAddressSchema);
export default UserAddress;
