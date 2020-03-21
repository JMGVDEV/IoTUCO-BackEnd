var router = require("express").Router();
var users = require("../controllers/users");
const HttpStatus = require("web-status-codes");

router.post("/users", (req, res) => {
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
