var express = require("express");
var router = express.Router();
var service = require("../services/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/", async (req, res) => {
  const user = await service.add(req.body);
  return res.status(201).json(user);
});
router.post("/login", async (req, res) => {
  const token = await service.login(req.body.email, req.body.password);
  if (!token) {
    return res.status(401).json({ message: "email ou mot de passe incorrect" });
  }
  return res.status(200).json({ token: token });
});

module.exports = router;
