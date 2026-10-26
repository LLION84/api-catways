const Reservation = require("../models/reservation");

exports.getAll = async (id) => {
  return await Reservation.find({ catwayNumber: id });
};
