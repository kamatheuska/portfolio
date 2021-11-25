jest.mock('../../model/blogPost');

const BlogPost = require('../../model/blogPost');
const {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} = require('../blog');
const { generatePostStubs } = require('../../constants/stubs');

let req;
let res;
let posts;
const nextMock = jest.fn();
const sendMock = jest.fn();

describe('🌳  BlogPost Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 getBlogPosts', () => {
        describe('🍉 no error', () => {
            beforeEach(async () => {
                req = {};
                res = { send: sendMock };
                posts = generatePostStubs(3);
                BlogPost.find.mockImplementation(() => Promise.resolve(posts));

                await getBlogPosts(req, res, nextMock);
            });

            it('🌱 calls BlogPost.find', () => {
                expect(BlogPost.find).toHaveBeenCalled();
                expect(BlogPost.find).toHaveBeenCalledWith({});
            });

            it('🌱 calls send', () => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith(posts);
            });

            it('🌱 does not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });
        describe('🍉 when an error', () => {
            const error = new Error('BlogPost api error');

            beforeEach(async () => {
                req = {};
                res = { send: sendMock };
                posts = generatePostStubs(3);
                BlogPost.find.mockImplementation(() => {
                    throw error;
                });

                await getBlogPosts(req, res, nextMock);
            });

            it('🌱 calls next', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });
    describe('🌴 getPostsById', () => {
        let id;

        describe('🍉 no error', () => {
            beforeEach(async () => {
                posts = generatePostStubs(3, true);
                id = posts[0]._id;

                req = { params: { id } };
                res = { send: sendMock };
                BlogPost.findById.mockImplementation(() => Promise.resolve(posts[0]));

                await getBlogPostById(req, res, nextMock);
            });

            it('🌱 calls BlogPost.findById', () => {
                expect(BlogPost.findById).toHaveBeenCalled();
                expect(BlogPost.findById).toHaveBeenCalledWith(id);
            });

            it('🌱 calls send', () => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith(posts[0]);
            });

            it('🌱 does not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });

        describe('🍉 when an error', () => {
            const error = new Error('BlogPost api error');

            beforeEach(() => {
                posts = generatePostStubs(6, true);
                id = posts[4]._id;
                req = { params: { id } };
                res = { send: sendMock };

                BlogPost.findById.mockImplementation(() => {
                    throw error;
                });
            });

            it('🌱 calls next when an error is thrown', async () => {
                await getBlogPostById(req, res, nextMock);

                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });

            it('🌱 calls next when an error no idea is passed, fails gracefully', async () => {
                req = {};
                await getBlogPostById(req, res, nextMock);

                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('🌴 createBlogPost', () => {
        const saveMock = jest.fn();
        describe('🍉 no error', () => {
            beforeEach(async () => {
                posts = generatePostStubs(1, true);
                req = { body: posts[0] };
                res = { send: sendMock };
                BlogPost.mockImplementation(() => ({
                    save: saveMock,
                }));

                saveMock.mockImplementation(() => Promise.resolve(posts[0]));

                await createBlogPost(req, res, nextMock);
            });

            it('🌱 calls new BlogPost', () => {
                expect(BlogPost).toHaveBeenCalled();
                expect(BlogPost).toHaveBeenCalledWith({
                    content: posts[0].content,
                    title: posts[0].title,
                });
            });

            it('🌱 calls save', () => {
                expect(saveMock).toHaveBeenCalled();
            });

            it('🌱 calls send', () => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith(posts[0]);
            });

            it('🌱 does not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });

        describe('🍉 when an error', () => {
            const error = new Error('BlogPost api error');

            beforeEach(async () => {
                posts = generatePostStubs(1, true);
                req = { body: posts[0] };
                res = { send: sendMock };
                BlogPost.mockImplementation(() => ({
                    save: saveMock,
                }));

                saveMock.mockImplementation(() => {
                    throw error;
                });

                await createBlogPost(req, res, nextMock);
            });

            it('🌱 calls next', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('🌴 updateBlogPost', () => {
        const saveMock = jest.fn();
        let id;

        describe('🍉 no error', () => {
            beforeEach(async () => {
                posts = generatePostStubs(2, true);
                id = posts[0]._id;

                req = { body: posts[1], params: { id } };
                res = { send: sendMock };

                BlogPost.findById.mockImplementation(() =>
                    Promise.resolve({
                        ...posts[0],
                        save: saveMock,
                    }),
                );
                saveMock.mockImplementation(() => Promise.resolve(posts[1]));

                await updateBlogPost(req, res, nextMock);
            });

            it('🌱 calls BlogPost.findById', () => {
                expect(BlogPost.findById).toHaveBeenCalled();
                expect(BlogPost.findById).toHaveBeenCalledWith(id);
            });

            it('🌱 calls send', () => {
                expect(sendMock).toHaveBeenCalled();
                expect(sendMock).toHaveBeenCalledWith(posts[1]);
            });

            it('🌱 does not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });

        describe('🍉 when an error', () => {
            const error = new Error('BlogPost api error');

            beforeEach(async () => {
                posts = generatePostStubs(2, true);
                req = { body: posts[0] };
                res = { send: sendMock };

                BlogPost.findById.mockImplementation(() => {
                    throw error;
                });
                saveMock.mockImplementation(() => {
                    throw error;
                });

                await updateBlogPost(req, res, nextMock);
            });

            it('🌱 calls next', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('🌴 deleteBlogPost', () => {
        let id;

        describe('🍉 no error', () => {
            beforeEach(async () => {
                posts = generatePostStubs(2, true);
                id = posts[0]._id;

                req = { body: posts[1], params: { id } };
                res = { send: sendMock };

                BlogPost.deleteOne.mockImplementation(() => Promise.resolve({ deletedCount: 1 }));

                await deleteBlogPost(req, res, nextMock);
            });

            it('🌱 calls BlogPost.deleteOne', () => {
                expect(BlogPost.deleteOne).toHaveBeenCalled();
                expect(BlogPost.deleteOne).toHaveBeenCalledWith({ _id: id });
            });

            it('🌱 calls send', () => {
                expect(sendMock).toHaveBeenCalled();
                expect(sendMock).toHaveBeenCalledWith({ deletedCount: 1 });
            });

            it('🌱 does not call next', () => {
                expect(nextMock).not.toHaveBeenCalled();
            });
        });

        describe('🍉 when an error', () => {
            const error = new Error('BlogPost api error');

            beforeEach(async () => {
                posts = generatePostStubs(2, true);
                req = { body: posts[0] };
                res = { send: sendMock };

                BlogPost.deleteOne.mockImplementation(() => {
                    throw error;
                });

                await deleteBlogPost(req, res, nextMock);
            });

            it('🌱 calls next', () => {
                expect(nextMock).toHaveBeenCalled();
                expect(nextMock).toHaveBeenCalledWith(error);
            });
        });
    });
});
