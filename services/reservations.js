const Reservation = require("../models/reservation");

exports.getAll = async (id) => {
  return await Reservation.find({ catwayNumber: id });
};

exports.getById = async (id, idReservation) => {
  return await Reservation.findOne({ _id: idReservation, catwayNumber: id });
};

exports.create = async (id, data) => {
  data.catwayNumber = id;
  return await Reservation.create(data);
};

exports.remove = async (id, idReservation) => {
  return await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber: id,
  });
};

exports.list = async () => {
  return await Reservation.find();
};
