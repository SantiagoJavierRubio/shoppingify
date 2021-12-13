const express = require('express');
const { getLists, getListDetail, createList, deleteList } = require('../controllers/lists.js');
const { isAuthorized } = require('../controllers/users.js');

const router = express.Router();

router.get('/', isAuthorized, getLists);
router.get('/info/:id', isAuthorized, getListDetail)
router.post('/create', isAuthorized, createList);
router.post('/delete', isAuthorized, deleteList);

module.exports = router;