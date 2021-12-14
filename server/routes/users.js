const express = require('express');
const { createUser, authUser, logOut, checkUser } = require('../controllers/users.js');

const router = express.Router();

router.post('/create', createUser);
router.post('/auth', authUser);
router.post('/logout', logOut);
router.get('/check', checkUser);

module.exports = router;