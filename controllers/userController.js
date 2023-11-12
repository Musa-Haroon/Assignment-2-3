const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const jwt = require('jsonwebtoken');

const userController = {
    
    // Get a specific user
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password').populate('following', 'username');
            
            if(user.blocked){
                return res.status(400).json({ message: 'User blocked' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Update a specific user
    updateProfile: async (req, res) => {
        const { username, password, oldPassword } = req.body;

        try {
            let user = await User.findById(req.userId);
            if (username) user.username = username;
            if (password){
                const isMatch = false;
                if(oldPassword === user.password){
                    isMatch = true;
                }

                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                user.password = password;
            }

            await user.save();
            res.json({ message: 'Profile updated' });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Server error' });
        }
    },

    followUser: async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            console.log(user);
            const userToFollow = await User.findById(req.params.userId);

            user.following.push(userToFollow.id);
            const notification = {
                content: `${user.username} has followed you.`,
              };
            userToFollow.notifications.push(notification);

            await userToFollow.save();
            await user.save();

            res.json({ message: 'Followed user successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    getUserFeed: async (req, res) => {
        try {
            const user = await User.findById(req.userId).populate('following');
            const feed = await Blog.find({ username: { $in: user.following }, status: { $ne: 'disabled' } }).populate('username', 'username');  // $in: user.following means that the username is in the array of following


            res.json(feed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    getNotifications: async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            
            user.notifications.sort((a,b) => b.creationDate - a.creationDate);
            
            res.json(user.notifications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    registerUser: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(user) {
                return res.json({msg: 'Email already exists'});
            }
            
            //const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role,
            });
            await newUser.save();
            res.json({ msg: 'Created a user' });
        } catch (err) {
            res.json(err);
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email});
            if(!user) {
                res.json({msg: 'Invalid email or password'});
            }

            var isMatch = false;
            if (req.body.password == user.password){
                isMatch = true;
            }
             
            if(!isMatch) {
                res.json({msg: 'Invalid username or password'});
            }
            const token = jwt.sign({id: user._id}, process.env.TOKEN);
            res.json({token});
        } catch(err) {
            res.json(err);
        }
    }
};

module.exports = userController;