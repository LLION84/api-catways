const Catway = require("../models/catway");

exports.getAll = async () => {
  return await Catway.find();
};
