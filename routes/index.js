const express = require("express");
const router = express.Router();
const userService = require("../services/users");
const auth = require("../middlewares/private");
const catwayService = require("../services/catways");
const reservationService = require("../services/reservations");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Port de plaisance Russell", error: null });
});

router.get("/dashboard", auth.checkJWT, function (req, res, next) {
  res.render("dashboard", { message: null });
});

router.post("/dashboard/catways", auth.checkJWT, async (req, res) => {
  try {
    await catwayService.create(req.body);
    return res.render("dashboard", { message: "Catway créé" });
  } catch (error) {
    res.render("dashboard", { error: error.message });
  }
});

router.post("/dashboard/catways/delete", auth.checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.remove(req.body.id);
    if (!catway) {
      return res.render("dashboard", { message: "Catway introuvable" });
    }
    return res.render("dashboard", { message: "Catway supprimé" });
  } catch (error) {
    return res.render("dashboard", { message: error.message });
  }
});

router.post("/dashboard/catways/update", auth.checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.update(req.body.id, {
      catwayState: req.body.catwayState,
    });
    if (!catway) {
      return res.render("dashboard", { message: "Catway introuvable" });
    }
    return res.render("dashboard", { message: "État du catway modifié" });
  } catch (error) {
    return res.render("dashboard", { message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await userService.login(req.body.email, req.body.password);
    if (!token) {
      return res.render("index", {
        title: "Port de plaisance Russell",
        error: "email ou mot de passe incorrect",
      });
    }
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/dashboard");
  } catch (error) {
    return res.render("index", {
      title: "Port de plaisance Russell",
      error: error.message,
    });
  }
});
router.post("/dashboard/reservations", auth.checkJWT, async (req, res) => {
  try {
    await reservationService.create(req.body.catwayNumber, req.body);
    return res.render("dashboard", { message: "Réservation enregistrée" });
  } catch (error) {
    return res.render("dashboard", { message: error.message });
  }
});
router.post(
  "/dashboard/reservations/delete",
  auth.checkJWT,
  async (req, res) => {
    try {
      const reservation = await reservationService.remove(
        req.body.catwayNumber,
        req.body.idReservation,
      );
      if (!reservation) {
        return res.render("dashboard", { message: "Réservation introuvable" });
      }
      return res.render("dashboard", { message: "Réservation supprimée" });
    } catch (error) {
      return res.render("dashboard", { message: error.message });
    }
  },
);
module.exports = router;
