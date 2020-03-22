var router = require("express").Router();
const users = require("../controllers/users");
const HttpStatus = require("web-status-codes");
const auth = require("../middlewares/jwt_auth");

router.post("/users", mid1, mid2, (req, res) => {
  users
    .create_user(req.body)
    .then(jwt => {
      res.status(HttpStatus.CREATED).json({ ok: true, ...jwt });
    })
    .catch(err => {
      console.log(err);
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

router.post("/login", (req, res) => {
  users
    .auth_user(req.body)
    .then(jwt => {
      res.status(HttpStatus.OK).json({ ok: true, ...jwt });
    })
    .catch(err => {
      res.status(HttpStatus.UNAUTHORIZED).json({ ok: false, err: err });
    });
});

module.exports = router;
