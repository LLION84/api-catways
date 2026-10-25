var express = require("express");
var router = express.Router();
var service = require("../services/catways");

const auth = require("../middlewares/private");

router.get("/", auth.checkJWT, async (req, res) => {
  const catways = await service.getAll();
  return res.status(200).json(catways);
});

router.get("/:id", auth.checkJWT, async (req, res) => {
  const catway = await service.getById(req.params.id);
  if (!catway) {
    return res.status(404).json({ message: "catway introuvable" });
  }
  return res.status(200).json(catway);
});

router.post("/", auth.checkJWT, async (req, res) => {
  const catway = await service.create(req.body);
  return res.status(201).json(catway);
});

module.exports = router;
