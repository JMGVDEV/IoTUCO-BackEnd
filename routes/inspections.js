var router = require('express').Router();
const auth = require('../middlewares/jwt_auth');
const HttpStatus = require('web-status-codes');
const inspections = require('../controllers/growbed_inspection');
const diseases = require('../controllers/diseases');

router.post('/inspection/:growbed', auth.verify_user, (req, res) => {
  inspection = {
    ...req.params,
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
      res.status(HttpStatus.SERVER_ERROR).json({ ok: false });
    });
});

/*
 *    Se deben obtener las enfermedades desde una base de datos, deberían haber endpoints para crear enfermedades
 */
router.get('/pests', auth.verify_user, async (req, res) => {
  try {
    const pests = diseases.getAllDiseases();
    res.status(HttpStatus.OK).json({ ok: true, pests });
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ ok: false, error });
  }
});

module.exports = router;
