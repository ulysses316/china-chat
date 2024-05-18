// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // phone: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  password: {
    type: String,
    required: true,
  },
});

//Hasshing the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare the password in the database and the one that the user type in
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
