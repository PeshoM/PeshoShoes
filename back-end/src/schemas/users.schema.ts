import { Schema, model } from "mongoose";
import { pipeline } from "stream";

export interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<user>({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const User = model<user>("users", userSchema);
