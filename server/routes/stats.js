const express = require('express');
const { getStats } = require('../controllers/stats.js');
const { isAuthorized } = require('../controllers/users.js');

const router = express.Router();

router.use(isAuthorized);
router.get('/', getStats);

module.exports = router;