const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const Auth = async(req, res, next) => {
    const token = req.header('Authorization');
    if (!token) 
      return res.status(401).send('Unauthorized');
  
    jwt.verify(token, process.env.TOKEN, async(err, user) => {
      if (err) {
          console.log(token);
          return res.status(401).send('Invalid token');
      }
      req.userId = user.id;
      console.log(user.id + " bbubuwbdw");
      console.log(user);

      const currUser = await User.findById(user.id);
      console.log(currUser);

      if (req.originalUrl.startsWith('/admin') && currUser.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if(user.blocked){
          return res.status(400).json({ message: 'User blocked' });
      }

      next();
    });
  };

  module.exports = Auth;