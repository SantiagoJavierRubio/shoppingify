const express = require('express');
const { getLists, getListDetail, createList, deleteList, setActiveList, setCancelledList, setCompletedList } = require('../controllers/lists.js');
const { isAuthorized } = require('../controllers/users.js');

const router = express.Router();

router.use(isAuthorized);
router.get('/', getLists);
router.get('/info', getListDetail);
router.post('/create', createList);
router.post('/delete', deleteList);
router.post('/complete', setCompletedList);
router.post('/cancel', setCancelledList);
router.post('/active', setActiveList);

module.exports = router;