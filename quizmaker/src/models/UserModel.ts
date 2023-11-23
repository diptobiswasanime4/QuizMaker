import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.models.users || mongoose.model("Users", UserSchema);

export default UserModel;
