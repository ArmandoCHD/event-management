
const router = require('express').Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoleAndPermission = require('../middleware/auth');

router.route('/')
  .get(authenticateToken, verifyRoleAndPermission(['READ']), userController.getAllUsers);

router.route('/add')
  .post(authenticateToken, verifyRoleAndPermission(['CREATE']), userController.createUser);

router.route('/:id')
  .get(authenticateToken, verifyRoleAndPermission(['READ']), userController.getUserById);

router.route('/:id')
  .delete(authenticateToken, verifyRoleAndPermission(['DELETE']), userController.deleteUserById);

router.route('/update/:id')
  .post(authenticateToken, verifyRoleAndPermission(['UPDATE']), userController.updateUserById);

module.exports = router;
