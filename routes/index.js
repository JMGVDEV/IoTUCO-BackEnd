var router = require("express").Router();

// Include here all routes
router.use("/api", require("./users"));
router.use("/api", require("./devices"));
router.use("/api", require("./control"));

module.exports = router;
