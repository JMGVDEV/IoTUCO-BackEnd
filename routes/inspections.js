var router = require('express').Router();
const auth = require('../middlewares/jwt_auth');
const HttpStatus = require('web-status-codes');
const inspections = require('../controllers/growbed_inspection');
const diseases = require('../controllers/diseases');

router.post('/inspection', auth.verify_user, (req, res) => {
  inspection = {
    ...req.body,
    hour: Date.now() - 5 * 60 * 60 * 1000, // To adjust to local time
  };

  console.log(inspection);

  inspections
    .save_growbed_inspection(inspection)
    .then(() => {
      res.status(HttpStatus.OK).json({ ok: true });
    })
    .catch((e) => {
      res.status(HttpStatus.BAD_REQUEST).json({ ok: false });
    });
});

router.get('/inspection', auth.verify_user, async (req, res) => {
  try {
    let inspection = await inspections.get_inspection(req.query.growbed_id);
    res.status(200).json({
      ok: true,
      inspection: {
        observation: inspection.observation,
        pests: inspection.pests,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_GATEWAY).json({ ok: false, error });
  }
});

/*
 *    Se deben obtener las enfermedades desde una base de datos, deberían haber endpoints para crear enfermedades
 */
router.get('/pests', auth.verify_user, async (req, res) => {
  try {
    let pests = await diseases.getAllDiseases();
    res.status(HttpStatus.OK).json({ ok: true, pests });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

router.post('/pests', auth.verify_user, async (req, res) => {
  try {
    const pest = await diseases.createDisease(req.body);
    res.status(HttpStatus.OK).json({ ok: true, pest });
  } catch (error) {
    console.log('ERRRRRR');
    res.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
  }
});

module.exports = router;
