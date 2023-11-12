const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const blogController = {
    getAllBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        } catch (err) {
            res.json(err);
        }
    },

    getBlogById: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);

            if(blog.status === 'disabled') {
                return res.json({ msg: 'Blog is disabled' });
            }

            res.json(blog);
        } catch (err) {
            res.json(err);
        }
    },

    createBlog: async (req, res) => {
        try {
            const newBlog = new Blog({
                title: req.body.title,
                content: req.body.content,
                username: req.userId,
                categories: req.body.category
            });
            await newBlog.save();
            res.json({ msg: 'Created a blog' });
        } catch (err) {
            res.json(err);
        }
    },

    updateBlog: async (req, res) => {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content,
            });
            res.json({ msg: 'Updated a blog' });
        } catch (err) {
            res.json(err);
        }
    },

    deleteBlog: async (req, res) => {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Deleted a blog' });
        } catch (err) {
            res.json(err);
        }
    },

    addRating: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);

            if(blog.status === 'disabled') {
                return res.json({ msg: 'Blog is disabled' });
            }

            const alreadyRated = blog.ratings.find(rating => rating.username.toString() === req.userId.toString());  
            if(alreadyRated) {
                return res.json({ msg: 'Already rated' });
            }

            const rating = {
                rating: req.body.rating,
                username: req.userId
            };
            blog.ratings.push(rating);

            let sum = 0;
            blog.ratings.forEach(rating => {
                sum += rating.rating;
            });
            blog.avgRating = sum / blog.ratings.length;

            await blog.save();
            res.json({ msg: 'Added a rating' });
        } catch (err) {
            res.json(err);
        }
    },

    addComment: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id).populate('username', '_id');

            if(blog.status === 'disabled') {
                return res.json({ msg: 'Blog is disabled' });
            }

            const commenter = await User.findById(req.userId);
            const owner = await User.findById(blog.username._id);
            const notification = {
                content: `${commenter.username} has commented on your blog.`,
            };

            owner.notifications.push(notification);
            await owner.save();
            
            blog.comments.push({content: req.body.content, username: req.userId});
            await blog.save();
            
            res.json({ msg: 'Added a comment' });
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    searchBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find({ $text: { $search: req.body.query } });
            res.json(blogs);
        } catch (err) {
            res.json(err);
        }
    }
};

module.exports = blogController;