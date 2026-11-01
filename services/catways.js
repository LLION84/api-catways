const Catway = require("../models/catway");

/**
 * Récupère tous les catways.
 * @returns {Promise<Array>} La liste de tous les catways
 */
exports.getAll = async () => {
  return await Catway.find();
};

/**
 * Récupère un catway grâce à son numéro.
 * @param {number} id - Le numéro du catway
 * @returns {Promise<Object|null>} Le catway trouvé, ou null s'il n'existe pas
 */
exports.getById = async (id) => {
  return await Catway.findOne({ catwayNumber: id });
};

/**
 * Crée un nouveau catway.
 * @param {Object} data - Les données du catway (catwayNumber, type, catwayState)
 * @returns {Promise<Object>} Le catway créé
 */
exports.create = async (data) => {
  return await Catway.create(data);
};

/**
 * Supprime un catway grâce à son numéro.
 * @param {number} id - Le numéro du catway
 * @returns {Promise<Object|null>} Le catway supprimé, ou null s'il n'existe pas
 */
exports.remove = async (id) => {
  return await Catway.findOneAndDelete({ catwayNumber: id });
};

/**
 * Modifie une partie d'un catway (PATCH).
 * @param {number} id - Le numéro du catway
 * @param {Object} data - Les champs à modifier
 * @returns {Promise<Object|null>} Le catway après modification, ou null s'il n'existe pas
 */
exports.update = async (id, data) => {
  return await Catway.findOneAndUpdate({ catwayNumber: id }, data, {
    returnDocument: "after",
  });
};

/**
 * Remplace entièrement un catway (PUT).
 * @param {number} id - Le numéro du catway
 * @param {Object} data - Toutes les données du catway
 * @returns {Promise<Object|null>} Le catway après remplacement, ou null s'il n'existe pas
 */
exports.replace = async (id, data) => {
  return await Catway.findOneAndReplace({ catwayNumber: id }, data, {
    returnDocument: "after",
  });
};
