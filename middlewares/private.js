const jwt = require("jsonwebtoken");

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
