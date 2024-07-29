const router = require('express').Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.route('/login')
    .post(authController.login);

router.route('/register')
    .post(authController.register);

router.route('/token')
    .post(authenticateToken, authController.verifyAndRenewToken); 

module.exports = router;
