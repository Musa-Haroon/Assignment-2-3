const router = require('express').Router();
const blogController = require('../controllers/blogController');
const Auth = require('../middlewares/Auth');

router.get('/', blogController.getAllBlogs);                        // get all blogs
router.get('/:id', blogController.getBlogById);                     // get a blog by id
router.post('/', Auth, blogController.createBlog);                  // create a blog
router.post('/search', blogController.searchBlogs);                 // search blogs
router.put('/:id', Auth, blogController.updateBlog);                // update a blog
router.delete('/:id', Auth, blogController.deleteBlog);             // delete a blog
router.post('/:id/ratings', Auth, blogController.addRating);         // add a rating to a blog
router.put('/:id/comments', Auth, blogController.addComment);       // add a comment to a blog

module.exports = router;