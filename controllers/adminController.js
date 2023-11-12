const User = require('../models/userModel');
const Blog = require('../models/blogModel');

const adminController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getAllBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getBlog: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);
            res.json(blog);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Deleted a user' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteBlog: async (req, res) => {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Deleted a blog' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // block a specific user
    blockUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id);
            user.isBlocked = true;
            await user.save();

            res.json({ msg: 'Blocked a user' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // unblock a specific user
    unblockUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id);
            user.isBlocked = false;
            await user.save();

            res.json({ msg: 'Unblocked a user' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // disable a specific blog
    disableBlog: async (req, res) => {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id);
            blog.status = "disabled";
            await blog.save();

            res.json({ msg: 'Disabled a blog' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // enable a specific blog
    enableBlog: async (req, res) => {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id);
            blog.status = "enabled";
            await blog.save();

            res.json({ msg: 'Enabled a blog' });
        } catch (err) {
            res.status(400).json(err);
        }
    }


    
};

module.exports = adminController;