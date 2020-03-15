var router = require("express").Router();
var users = require("../controllers/users");
const HttpStatus = require("web-status-codes");

router.post("/users", function(req, res) {
  users
    .create_user(req.body)
    .then(user => {
      res.status(HttpStatus.CREATED).json({ ok: true, user });
    })
    .catch(err => {
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

module.exports = router;
