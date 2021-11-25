const router = require('express').Router();
const { getBlogPosts, getBlogPostById, createBlogPost } = require('../middleware/blog');

router.get('/posts', getBlogPosts);
router.get('/posts/:id', getBlogPostById);
router.post('/posts', createBlogPost);

module.exports = router;
