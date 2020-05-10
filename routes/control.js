var router = require('express').Router();
const auth = require('../middlewares/jwt_auth');
const HttpStatus = require('web-status-codes');
const control = require('../services/mqtt/control-mqtt');
const peripherals = require('../Utils/peripherals');

router.post('/control/blinds', auth.verifyTotp, (req, res) => {
  control.publish_greenhouse(
    peripherals.BLINDS,
    req.body.value,
    req.body.zone,
    req.body.greenhouse
  );

  res.status(HttpStatus.OK).json({ ok: true });
});

router.post('/control/fan', auth.verifyTotp, (req, res) => {
  control.publish_greenhouse(
    peripherals.FAN,
    req.body.value,
    req.body.zone,
    req.body.greenhouse
  );
  res.status(HttpStatus.OK).json({ ok: true });
});

router.post('/control/lights', auth.verifyTotp, (req, res) => {
  control
    .program_lights(req.body)
    .then(() => {
      res.status(HttpStatus.OK).json({ ok: true });
    })
    .catch((err) => {
      res.status(HttpStatus.BAD_REQUEST).json({ ok: false, err });
    });
});

module.exports = router;
