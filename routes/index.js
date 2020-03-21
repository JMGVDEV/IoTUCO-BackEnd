var router = require('express').Router();

// Include here all routes
router.use('/api',require('./users'))

module.exports = router;
