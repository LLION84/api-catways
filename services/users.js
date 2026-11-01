const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Crée un utilisateur, avec son mot de passe chiffré par bcrypt.
 * @param {Object} temp - Les données de l'utilisateur (name, email, password)
 * @returns {Promise<Object>} L'utilisateur créé
 */
exports.add = async (temp) => {
  temp.password = await bcrypt.hash(temp.password, 10);
  const user = await User.create(temp);
  return user;
};

/**
 * Vérifie l'email et le mot de passe, et fabrique un token JWT valable 24 h.
 * @param {string} email - L'email de l'utilisateur
 * @param {string} password - Le mot de passe tapé, en clair
 * @returns {Promise<string|null>} Le token, ou null si l'email ou le mot de passe est faux
 */
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

/**
 * Supprime un utilisateur grâce à son identifiant.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @returns {Promise<Object|null>} L'utilisateur supprimé, ou null
 */
exports.remove = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * Modifie un utilisateur. Le mot de passe, s'il est fourni, est chiffré.
 * @param {string} id - L'identifiant MongoDB de l'utilisateur
 * @param {Object} data - Les champs à modifier (name, email, password)
 * @returns {Promise<Object|null>} L'utilisateur après modification, ou null
 */
exports.update = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
