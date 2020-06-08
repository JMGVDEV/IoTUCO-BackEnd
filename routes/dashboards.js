const {
  getHistoricalEnvironmentVariables,
  getDiseases,
  getDegreesDay,
  getEvents,
} = require('../controllers/dashboards');
var router = require('express').Router();
const auth = require('../middlewares/jwt_auth');
const HttpStatus = require('web-status-codes');

router.get('/dashboards/historical', auth.verify_user, async (req, res) => {
  try {
    let data = await getHistoricalEnvironmentVariables(
      req.query.greenhouse,
      req.query.growbed
    );
    res.status(HttpStatus.OK).json({ ok: true, data });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

router.get('/dashboards/diseases', auth.verify_user, async (req, res) => {
  try {
    let data = await getDiseases(req.query.greenhouse);
    res.status(HttpStatus.OK).json({ ok: true, data });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

router.get('/dashboards/degrees', auth.verify_user, async (req, res) => {
  try {
    let data = await getDegreesDay(req.query.greenhouse, req.query.growbed);
    res.status(HttpStatus.OK).json({ ok: true, data });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

router.get('/dashboards/events', auth.verify_user, async (req, res) => {
  try {
    let data = await getEvents(req.query.greenhouse);
    res.status(HttpStatus.OK).json({ ok: true, data });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

module.exports = router;
