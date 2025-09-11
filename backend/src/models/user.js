import { model, Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isMfaActive: { type: Boolean, required: false },
    twoFactorSecret: {
      type: String,
    },
  },
  {
    timestamps: true, //Mongoose tracks when the document was created and last updated,
  }
);

const User = model("User", userSchema);
export default User;
