const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminUserSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Cpassword: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
adminUserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    const salt = await bcrypt.genSalt(12);
    this.Password = await bcrypt.hash(this.Password, salt);
    this.Cpassword = this.Password;
  }
  next();
});
adminUserSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { id: this._id, name: this.Fname },
    process.env.SECRET_KEY
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
module.exports = AdminUser;
