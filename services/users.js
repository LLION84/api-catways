const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.add = async (req, res, next) => {
  const temp = req.body;
  temp.password = await bcrypt.hash(temp.password, 10);
  const user = await User.create(temp);
  return res.status(201).json(user);
};
