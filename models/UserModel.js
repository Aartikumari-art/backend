const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },


  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const userModel = model("User", userSchema);

const createUser = async (body) => {
  const newUser = await userModel.create(body);
  return newUser;
};

const getUsers = async (pagination) => {
  const startIndex = (pagination.page - 1) * pagination.limit;

  pagination.status = filter.status;
  const users = userModel.find();
  return users;
};

module.exports = {
  createUser,
  getUsers,
  userModel,
};
