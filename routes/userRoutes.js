const router = require('express').Router();
const userController = require('../controllers/userController');
const Auth = require('../middlewares/Auth');

router.get('/', Auth, userController.getProfile);                       // Get user profile
router.post('/register', userController.registerUser);                  // Register a new user
router.post('/login', userController.loginUser);                        // Login a user
router.put('/', Auth, userController.updateProfile);                    // Update user profile
router.put('/follow/:userId', Auth, userController.followUser);         // Follow a user
router.get('/feed', Auth, userController.getUserFeed);                  // Get user feed
router.get('/notifications', Auth, userController.getNotifications);    // Get user notifications

module.exports = router; 