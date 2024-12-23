const express = require('express');
const router = express.Router();
const { getNotifications,handleRequest } = require('../controllers/NotificationController');

router.get('/notifications', getNotifications);
router.post('/handle-request', handleRequest);

module.exports = router;
