import { Schema, model } from "mongoose";

const schema = new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true, max: 100 },
    role: { type: String, default: "user" },
    premium: { type: Boolean, default: false },
    cartID: {
      type: String,
      required: true,
      unique: true,
    },
    purchase_made: {
      type: [String],
      default: [],
    },
  });

  export const userModel = model("user", schema);