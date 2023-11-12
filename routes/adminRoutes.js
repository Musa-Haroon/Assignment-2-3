const router = require('express').Router();
const adminController = require('../controllers/adminController');
const Auth = require('../middlewares/Auth');

router.get('/users', Auth, adminController.getAllUsers);              // get all users
router.get('/blogs', Auth, adminController.getAllBlogs);              // get all blogs
router.delete('/users/:id', Auth, adminController.deleteUser);        // delete a user
router.delete('/blogs/:id', Auth, adminController.deleteBlog);        // delete a blog
router.put('/users/:id/block', Auth, adminController.blockUser);      // block a user
router.put('/users/:id/unblock', Auth, adminController.unblockUser);  // unblock a user  
router.put('/blogs/:id/disable', Auth, adminController.disableBlog);  // disable a blog
router.put('/blogs/:id/enable', Auth, adminController.enableBlog);    // enable a blog

module.exports = router;