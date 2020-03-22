var router = require("express").Router();
const users = require("../controllers/users");
const HttpStatus = require("web-status-codes");
const auth = require("../middlewares/jwt_auth");

// User: Create
router.post("/users", auth.verify_admin, (req, res) => {
  users
    .create_user(req.body)
    .then(() => {
      res.status(HttpStatus.CREATED).json({ ok: true });
    })
    .catch(err => {
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

// Get all users
router.get("/users", auth.verify_admin, (req, res) => {
  users
    .get_all_users()
    .then(users => {
      res.status(HttpStatus.CREATED).json({ ok: true, users });
    })
    .catch(err => {
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

router.put("/users/:id", auth.verify_admin, (req, res) => {
  users
    .update_user(req.body, req.params.id)
    .then(() => {
      res.status(HttpStatus.OK).json({ ok: true });
    })
    .catch(err => {
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

//Delete one user by id
router.delete("/users/:id", auth.verify_admin, (req, res) => {
  users
    .delete_user(req.params)
    .then(() => {
      res.status(HttpStatus.OK).json({ ok: true });
    })
    .catch(err => {
      res.status(HttpStatus.CONFLICT).json({ ok: false, err });
    });
});

// User: Login
router.post("/login", (req, res) => {
  users
    .login_user(req.body)
    .then(jwt => {
      res.status(HttpStatus.OK).json({ ok: true, ...jwt });
    })
    .catch(err => {
      res.status(HttpStatus.UNAUTHORIZED).json({ ok: false, err: err });
    });
});

module.exports = router;
