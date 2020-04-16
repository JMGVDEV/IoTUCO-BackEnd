const devices = require("../controllers/devices");
var router = require("express").Router();
const auth = require("../middlewares/jwt_auth");
const HttpStatus = require("web-status-codes");
const environment = require("../controllers/growbed_environment");

/* ------------------------------------------------------------------------------- 
        No se espera que éste código funcione adecuadamente cuando la
        aplicación escale, debido a los filtros implementados despúes
        de las consultas en las BD, lo ideal sería que en el frontend 
        se seleccionara una zona, la cual serviría como filtro para buscar
        los invernaderos, y posteriormente al seleccionar un
        invernadero, éste serviria como filtro para buscar las camas asociadas.
       
        NOTA: Por facilidad se esta haciendo de esta manera
----------------------------------------------------------------------------------*/

router.get("/grow_beds", auth.verify_user, (req, res) => {
  devices
    .get_all_grow_beds()
    .then((grow_beds_list) => {
      res.status(HttpStatus.OK).json({ ok: true, grow_beds: grow_beds_list });
    })
    .catch((err) => {
      res.status(HttpStatus.SERVER_ERROR).json({ ok: false, err: err });
    });
});

router.get("/grow_houses", auth.verify_user, (req, res) => {
  devices
    .get_all_grow_houses()
    .then((green_house_list) => {
      res
        .status(HttpStatus.OK)
        .json({ ok: true, green_houses: green_house_list });
    })
    .catch((err) => {
      res.status(HttpStatus.SERVER_ERROR).json({ ok: false, err: err });
    });
});

// ------------------------------------------------------------------
//          MODIFY TO GET ENVIRONMENT VARIABLES OF DATABASE
//-------------------------------------------------------------------

router.get("/grow_beds/:growbed_id", auth.verify_user, (req, res) => {
  environment
    .get_environment(req.params.growbed_id)
    .then((environment) => {
      res.status(HttpStatus.OK).json({
        ok: true,
        ...environment,
      });
    })
    .catch((e) => {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ ok: false, error: e.toString() });
    });
});

module.exports = router;
