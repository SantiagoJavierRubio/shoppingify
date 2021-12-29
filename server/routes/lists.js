const express = require('express');
const { getLists, getListDetail, createList, deleteList, getActiveList, setCancelledList, setCompletedList, deleteActive } = require('../controllers/lists.js');
const { isAuthorized } = require('../controllers/users.js');

const router = express.Router();

router.use(isAuthorized);
router.get('/', getLists);
router.get('/info', getListDetail);
router.get('/active', getActiveList);
router.post('/create', createList);
router.post('/delete-active', deleteActive);
router.post('/delete', deleteList);
router.post('/complete', setCompletedList);
router.post('/cancel', setCancelledList);

module.exports = router;