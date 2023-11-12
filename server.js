const mongoose = require('mongoose');
const express = require('express');
const nodemon = require('nodemon');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/DBWebA2&3')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

const app = express();
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = 3000;
app.listen (port, () => console.log (`Listening on port ${port}...`));