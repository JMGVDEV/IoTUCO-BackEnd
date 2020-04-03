var router = require("express").Router();
const auth = require("../middlewares/jwt_auth");
const HttpStatus = require("web-status-codes");

router.post("/control/blinds", auth.verify_user, (req, res) => {
  console.log(req.body);
  res.status(HttpStatus.OK).json({ ok: true });

  // Call mqtt blinds functions here
});

router.post("/control/fan", auth.verify_user, (req, res) => {
  console.log(req.body);
  res.status(HttpStatus.OK).json({ ok: true });

  // Call mqtt fan functions here
});

router.post("/control/lights", auth.verify_user, (req, res) => {
  console.log(req.body);
  res.status(HttpStatus.OK).json({ ok: true });

  // Call lights programer here
});

module.exports = router;
