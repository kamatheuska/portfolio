const _ = require('lodash');

const BlogPost = require('../model/blogPost');

async function getBlogPosts(req, res, next) {
    try {
        const posts = await BlogPost.find({});
        res.send(posts);
    } catch (error) {
        next(error);
    }
}

async function getBlogPostById(req, res, next) {
    try {
        const { id } = _.pick(req.params, ['id']);
        const post = await BlogPost.findById(id);
        res.send(post);
    } catch (error) {
        next(error);
    }
}

async function createBlogPost(req, res, next) {
    try {
        const { content, title } = _.pick(req.body, ['content', 'title']);
        const post = await new BlogPost({
            content,
            title,
        });
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (error) {
        next(error);
    }
}

async function updateBlogPost(req, res, next) {
    try {
        const { id } = _.pick(req.params, ['id']);
        const { content, title } = _.pick(req.body, ['content', 'title']);

        const blogPost = await BlogPost.findById(id);
        blogPost.content = content;
        blogPost.title = title;

        const savedBlogPost = await blogPost.save();
        res.send(savedBlogPost);
    } catch (error) {
        next(error);
    }
}

async function deleteBlogPost(req, res, next) {
    try {
        const { id } = _.pick(req.params, ['id']);

        const query = await BlogPost.deleteOne({ _id: id });
        res.send(query);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
