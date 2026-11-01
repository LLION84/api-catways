const Reservation = require("../models/reservation");

/**
 * Récupère toutes les réservations d'un catway.
 * @param {number} id - Le numéro du catway
 * @returns {Promise<Array>} La liste des réservations de ce catway
 */
exports.getAll = async (id) => {
  return await Reservation.find({ catwayNumber: id });
};

/**
 * Récupère une réservation d'un catway précis.
 * @param {number} id - Le numéro du catway
 * @param {string} idReservation - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation trouvée, ou null
 */
exports.getById = async (id, idReservation) => {
  return await Reservation.findOne({ _id: idReservation, catwayNumber: id });
};

/**
 * Enregistre une réservation sur un catway.
 * @param {number} id - Le numéro du catway réservé
 * @param {Object} data - Les données de la réservation (clientName, boatName, checkIn, checkOut)
 * @returns {Promise<Object>} La réservation créée
 */
exports.create = async (id, data) => {
  data.catwayNumber = id;
  return await Reservation.create(data);
};

/**
 * Supprime une réservation d'un catway.
 * @param {number} id - Le numéro du catway
 * @param {string} idReservation - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation supprimée, ou null
 */
exports.remove = async (id, idReservation) => {
  return await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber: id,
  });
};

/**
 * Récupère toutes les réservations, tous catways confondus.
 * @returns {Promise<Array>} La liste de toutes les réservations
 */
exports.list = async () => {
  return await Reservation.find();
};

/**
 * Récupère une réservation grâce à son seul identifiant.
 * @param {string} idReservation - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation trouvée, ou null
 */
exports.findById = async (idReservation) => {
  return await Reservation.findById(idReservation);
};
