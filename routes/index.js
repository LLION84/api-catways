const express = require("express");
const router = express.Router();
const userService = require("../services/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Port de plaisance Russell", error: null });
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
