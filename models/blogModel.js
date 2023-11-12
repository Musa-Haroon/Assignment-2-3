const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: Number,
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const CommentSchema = new mongoose.Schema({
    content: String,
    creationDate: { type: Date, default: Date.now },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    creationDate: { type: Date, default: Date.now },
    category: {type: String},
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    avgRating: { type: Number, default: 0},
    ratings: [RatingSchema],
    comments: [CommentSchema],
    status: { 
        type: String, 
        default: 'active' 
    }
});

blogSchema.index({ title: 'text', content: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;