var express = require("express");
var router = express.Router();
var service = require("../services/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", service.add);
router.post("/login", service.login);

module.exports = router;
