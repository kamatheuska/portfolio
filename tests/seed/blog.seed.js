const BlogPost = require('../../model/blogPost');
const { logInfo } = require('../../services/logger');

const seedBlogs = async (blogs) => {
    try {
        const response = await BlogPost.insertMany(blogs);
        logInfo('tests', 'Database seeded');
        return response.map(({ _doc }) => _doc);
    } catch (error) {
        console.error('Error on stubbing db for tests', error);
    }
};

exports.seedBlogs = seedBlogs;
