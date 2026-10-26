const express = require("express");
const router = express.Router();
const service = require("../services/catways");
const reservationService = require("../services/reservations");

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

router.delete("/:id", auth.checkJWT, async (req, res) => {
  const catway = await service.remove(req.params.id);
  if (!catway) {
    return res.status(404).json({ message: "catway introuvable" });
  }
  return res.status(200).json({ message: "catway supprimé" });
});

router.patch("/:id", auth.checkJWT, async (req, res) => {
  const catway = await service.update(req.params.id, req.body);
  if (!catway) {
    return res.status(404).json({ message: "catway introuvable" });
  }
  return res.status(200).json(catway);
});

router.put("/:id", auth.checkJWT, async (req, res) => {
  const catway = await service.replace(req.params.id, req.body);
  if (!catway) {
    return res.status(404).json({ message: "catway introuvable" });
  }
  return res.status(200).json(catway);
});

router.get("/:id/reservations", auth.checkJWT, async (req, res) => {
  const reservations = await reservationService.getAll(req.params.id);
  return res.status(200).json(reservations);
});

router.get(
  "/:id/reservations/:idReservation",
  auth.checkJWT,
  async (req, res) => {
    const reservation = await reservationService.getById(
      req.params.id,
      req.params.idReservation,
    );
    if (!reservation) {
      return res.status(404).json({ message: "réservation introuvable" });
    }
    return res.status(200).json(reservation);
  },
);

router.post("/:id/reservations", auth.checkJWT, async (req, res) => {
  const reservation = await reservationService.create(req.params.id, req.body);
  return res.status(201).json(reservation);
});

router.delete(
  "/:id/reservations/:idReservation",
  auth.checkJWT,
  async (req, res) => {
    const reservation = await reservationService.remove(
      req.params.id,
      req.params.idReservation,
    );
    if (!reservation) {
      return res.status(404).json({ message: "réservation introuvable" });
    }
    return res.status(200).json({ message: "réservation supprimée" });
  },
);

module.exports = router;
