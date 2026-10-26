const express = require("express");
const router = express.Router();
const service = require("../services/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async (req, res) => {
  try {
    const user = await service.add(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await service.login(req.body.email, req.body.password);
    if (!token) {
      return res
        .status(401)
        .json({ message: "email ou mot de passe incorrect" });
    }
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
