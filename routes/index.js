var router = require("express").Router();

// Include here all routes
router.use("/api", require("./users"));
router.use("/api", require("./environment"));
router.use("/api", require("./control"));
router.use("/api", require("./inspections"));

module.exports = router;
