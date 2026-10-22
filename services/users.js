const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.add = async (req, res, next) => {
  const temp = req.body;
  temp.password = await bcrypt.hash(temp.password, 10);
  const user = await User.create(temp);
  return res.status(201).json(user);
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "utilisateur introuvable" });
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(403).json({ message: "mot de passe incorrect" });
  }
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return res.status(200).json({ token: token });
};
