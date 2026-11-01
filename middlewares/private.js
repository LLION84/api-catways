const jwt = require("jsonwebtoken");

/**
 * Middleware qui protège une route : laisse passer seulement les utilisateurs connectés.
 * Le token est lu dans le cookie (navigateur) ou dans l'en-tête Authorization (Postman).
 * @param {Object} req - La requête Express
 * @param {Object} res - La réponse Express
 * @param {Function} next - Passe à la suite si le token est valide
 * @returns {void}
 */
exports.checkJWT = (req, res, next) => {
  let token = req.cookies.token;
  const header = req.headers.authorization;
  if (!token && header) {
    token = header.slice(7);
  }

  if (!token) {
    return res.status(401).json({ message: "token manquant" });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "token invalide" });
  }
};
