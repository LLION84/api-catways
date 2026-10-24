const jwt = require("jsonwebtoken");

exports.checkJWT = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "token manquant" });
  }
  const token = header.slice(7);
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "token invalide" });
  }
};
