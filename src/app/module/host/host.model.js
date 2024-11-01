const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const hostSchema = new Schema(
  {
    authId: {
      type: Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
    },
    phone_number: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Host = model("Host", hostSchema);

module.exports = Host;
