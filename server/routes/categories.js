const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoleAndPermission = require('../middleware/auth');

router.route('/add')
    .post(authenticateToken, verifyRoleAndPermission(['CREATE']), categoryController.createCategory);

router.route('/')
    .get(authenticateToken, verifyRoleAndPermission(['READ']), categoryController.getCategories);

router.route('/:id')
    .get(authenticateToken, verifyRoleAndPermission(['READ']), categoryController.getCategoryById)
    .put(authenticateToken, verifyRoleAndPermission(['UPDATE']), categoryController.updateCategory)
    .delete(authenticateToken, verifyRoleAndPermission(['DELETE']), categoryController.deleteCategory);

module.exports = router;
