const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            min: 10,
            required: true,
        },
        title: String,
    },
    {
        timestamps: true,
    },
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
