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

exports.remove = async (id) => {
  return await Catway.findOneAndDelete({ catwayNumber: id });
};

exports.update = async (id, data) => {
  return await Catway.findOneAndUpdate({ catwayNumber: id }, data, {
    returnDocument: "after",
  });
};
