const _ = require('lodash');
const sanitizeHtml = require('sanitize-html');

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
        const sanitizedHtmlContent = sanitizeHtml(content);
        const post = new BlogPost({
            content: sanitizedHtmlContent,
            title,
        });
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (error) {
        next(error);
    }
}

exports.getBlogPosts = getBlogPosts;
exports.getBlogPostById = getBlogPostById;
exports.createBlogPost = createBlogPost;
