import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true, //email should be unique for every user.
      required: true,
    },
    phoneNumber: {
      type: Schema.Types.Number,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
export default User;
