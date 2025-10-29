import { Schema, model } from "mongoose";

const userSchemas = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    address: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"] },
    orderedFoods: { type: [Schema.ObjectId] },
    // ttl: { type: Date },
    isVerified: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("user", userSchemas);
