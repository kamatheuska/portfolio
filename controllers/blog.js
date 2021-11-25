const router = require('express').Router();
const {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
} = require('../middleware/blog');

router.get('/posts', getBlogPosts);
router.get('/posts/:id', getBlogPostById);
router.post('/posts', createBlogPost);
router.put('/posts/:id', updateBlogPost);

module.exports = router;
