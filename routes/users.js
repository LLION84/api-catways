const express = require("express");
const router = express.Router();
const service = require("../services/users");
const auth = require("../middlewares/private");

router.post("/", auth.checkJWT, async (req, res) => {
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

router.delete("/:id", auth.checkJWT, async (req, res) => {
  try {
    const user = await service.remove(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "utilisateur introuvable" });
    }

    return res.status(200).json({ message: "utilisateur supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
