const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoleAndPermission = require('../middleware/auth');

router.route('/')
    .get(authenticateToken, verifyRoleAndPermission(['READ']), eventController.getEvents)
    .post(authenticateToken, verifyRoleAndPermission(['CREATE']), eventController.createEvent);

router.route('/:id')
    .get(authenticateToken, verifyRoleAndPermission(['READ']), eventController.getEventById)
    .put(authenticateToken, verifyRoleAndPermission(['UPDATE']), eventController.updateEvent)
    .delete(authenticateToken, verifyRoleAndPermission(['DELETE']), eventController.deleteEvent);

module.exports = router;
