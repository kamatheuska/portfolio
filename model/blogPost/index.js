const mongoose = require('mongoose');
const { sanitizeContent } = require('./functions');

const blogPostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            min: 1,
            required: true,
        },
        title: {
            type: String,
            min: 1,
            max: 200,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

blogPostSchema.pre('save', sanitizeContent);
blogPostSchema.pre('updateOne', sanitizeContent);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
