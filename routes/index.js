const express = require("express");
const router = express.Router();
const userService = require("../services/users");
const auth = require("../middlewares/private");
const catwayService = require("../services/catways");
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
module.exports = router;
