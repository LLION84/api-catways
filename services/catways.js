const Catway = require("../models/catway");

exports.getAll = async () => {
  return await Catway.find();
};

exports.getById = async (id) => {
  return await Catway.findOne({ catwayNumber: id });
};

exports.create = async (data) => {
  return await Catway.create(data);
};
