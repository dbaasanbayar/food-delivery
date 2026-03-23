import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    address: { type: String },
    role: { 
      type: String, 
      enum: ["USER", "ADMIN"] },
    orderedFoods: { type: [Schema.ObjectId] },
    // ttl: { type: Date }, // not sure to add here
    isVerified: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("user", userSchema);
