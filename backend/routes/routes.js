const router = require('express').Router();
const { loginController, registerController } = require('../controllers/authController');
const { addProjectController, getProjectsController } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/projects', authMiddleware, addProjectController);
router.get('/projects', getProjectsController);

module.exports = router;