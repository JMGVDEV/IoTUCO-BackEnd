var router = require('express').Router();
const auth = require('../middlewares/jwt_auth');
const HttpStatus = require('web-status-codes');
const control = require('../services/mqtt/control-mqtt');
const peripherals = require('../Utils/peripherals');
const { log_action } = require('../models/log_actions');

router.post('/control/door', auth.verifyTotp, (req, res) => {
  control.publish_greenhouse(
    peripherals.LOCK,
    req.body.value,
    req.body.zone,
    req.body.greenhouse
  );

  const logData = {
    hour: Date.now(),
    type: peripherals.LOCK,
    greenhouse_id: req.body.greenhouse,
  };

  log_action(logData).save();
  res.status(HttpStatus.OK).json({ ok: true });
});

router.post('/control/blinds', auth.verifyTotp, (req, res) => {
  control.publish_greenhouse(
    peripherals.BLINDS,
    req.body.value,
    req.body.zone,
    req.body.greenhouse
  );

  const logData = {
    hour: Date.now(),
    type: peripherals.BLINDS,
    greenhouse_id: req.body.greenhouse,
  };

  log_action(logData).save();
  res.status(HttpStatus.OK).json({ ok: true });
});

router.post('/control/fan', auth.verifyTotp, (req, res) => {
  control.publish_greenhouse(
    peripherals.FAN,
    req.body.value,
    req.body.zone,
    req.body.greenhouse
  );

  const logData = {
    hour: Date.now(),
    type: peripherals.FAN,
    greenhouse_id: req.body.greenhouse,
  };

  log_action(logData).save();
  res.status(HttpStatus.OK).json({ ok: true });
});

router.post('/control/lights', auth.verifyTotp, (req, res) => {
  const logData = {
    hour: Date.now(),
    type: peripherals.LIGHT,
    growbed_id: req.body.growbed,
    greenhouse_id: req.body.greenhouse,
  };

  log_action(logData).save();

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
