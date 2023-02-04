const router = require('express').Router();
const {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} = require('../middleware/blog');

router.get('/posts', getBlogPosts);
router.get('/posts/:id', getBlogPostById);
router.post('/posts', createBlogPost);
router.put('/posts/:id', updateBlogPost);
router.delete('/posts/:id', deleteBlogPost);

module.exports = router;
