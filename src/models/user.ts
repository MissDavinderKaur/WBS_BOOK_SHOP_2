import mongoose, { Schema, Document } from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<User>("User", UserSchema);
