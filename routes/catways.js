var express = require("express");
var router = express.Router();
var service = require("../services/catways");

const auth = require("../middlewares/private");

router.get("/", auth.checkJWT, async (req, res) => {
  const catways = await service.getAll();
  return res.status(200).json(catways);
});

module.exports = router;
