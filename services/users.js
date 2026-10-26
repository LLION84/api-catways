const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.add = async (temp) => {
  temp.password = await bcrypt.hash(temp.password, 10);
  const user = await User.create(temp);
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return null;
  }
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

exports.remove = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.update = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
