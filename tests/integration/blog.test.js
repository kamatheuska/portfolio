/* eslint-disable security/detect-non-literal-regexp */

const request = require('supertest');
const { seedBlogs } = require('../seed/blog.seed');
const { generatePostStubs } = require('../../constants/stubs');
const { cleanDb, teardown, setupTests } = require('../setup');
const BlogPost = require('../../model/blogPost');

let createdApp;
let createdServer;
let response;
let blogStubs;
let seeded;

const BASE_URL = '/api/blog';
const amount = 4;

describe(`🌳  Integration: BlogPost`, () => {
    beforeAll(async () => {
        try {
            const { app, server } = await setupTests({
                timeout: 25000,
            });

            createdApp = app;
            createdServer = server;
        } catch (error) {
            console.error(error);
        }
    });
    afterEach(async () => cleanDb());
    afterAll(async () => teardown(createdServer, { forceExit: false }));

    describe(`🍉  GET ${BASE_URL}/posts`, () => {
        beforeEach(async () => {
            blogStubs = generatePostStubs(amount);
            await seedBlogs(blogStubs);
            response = await request(createdApp).get(`${BASE_URL}/posts`);
        });

        it(`🌱 returns all entity blogPost saved in the db`, () => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(blogStubs.length);
        });

        it('🌱 blogPosts returned have a content and title properties', () => {
            expect(response.body[0].content).toBe(blogStubs[0].content);
            expect(response.body[0].title).toBe(blogStubs[0].title);
        });

        it('🌱 blogPosts returned have an id', () => {
            expect(response.body[0]._id).toBeDefined();
        });
    });

    describe(`🍉  GET ${BASE_URL}/posts/:id`, () => {
        beforeEach(async () => {
            blogStubs = generatePostStubs(amount);
            seeded = await seedBlogs(blogStubs);
        });

        it('🌱 returns blogPost with the given id', async () => {
            response = await request(createdApp).get(`${BASE_URL}/posts/${seeded[2]._id}`);
            expect(response.status).toBe(200);
            expect(response.body.content).toBe(seeded[2].content);
            expect(response.body.title).toBe(seeded[2].title);
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
            expect(response.body._id).toBe(seeded[2]._id.toString());
        });

        it(`🌱 fails and throws 400 if id is not found`, async () => {
            response = await request(createdApp).get(`${BASE_URL}/posts/123123`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({});
        });
    });

    describe(`🍉  POST ${BASE_URL}/posts`, () => {
        beforeEach(async () => {
            blogStubs = generatePostStubs(amount);
        });

        it('🌱 creates a new blogPost', async () => {
            const { content, title } = blogStubs[0];

            response = await request(createdApp).post(`${BASE_URL}/posts`).send({
                content,
                title,
            });

            expect(response.status).toBe(200);
            expect(response.body.content).toBe(content);
            expect(response.body.title).toBe(title);
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
            expect(response.body._id).toBeDefined();
        });

        it('🌱 fails to save html content if is all dirty', async () => {
            const { title } = blogStubs[0];
            const dirtyHtml = '<script>alert("Some alert") var dirty = "dirty"; </script>';

            response = await request(createdApp).post(`${BASE_URL}/posts`).send({
                content: dirtyHtml,
                title,
            });

            expect(response.status).toBe(400);

            const savedBlogPost = await BlogPost.findById(response.body._id);
            expect(savedBlogPost).toBeNull();
        });

        it('🌱 saves valid html but removes dirty html from it', async () => {
            const { title } = blogStubs[0];
            const dirtyHtml = '<script>alert("Some alert") var dirty = "dirty"; </script>';
            const cleanHtml = '<p>this is clean</p>';

            response = await request(createdApp)
                .post(`${BASE_URL}/posts`)
                .send({
                    content: `${dirtyHtml} ${cleanHtml} ${dirtyHtml}`,
                    title,
                });

            expect(response.status).toBe(200);
            expect(response.body.content).toMatch(cleanHtml);
            expect(response.body.title).toBe(title);
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
            expect(response.body._id).toBeDefined();

            const savedBlogPost = await BlogPost.findById(response.body._id);
            expect(savedBlogPost.content).not.toMatch(new RegExp(dirtyHtml));
            expect(savedBlogPost.content).toMatch(new RegExp(cleanHtml));
        });

        it(`🌱 fails and throws 400 if no body is sended`, async () => {
            response = await request(createdApp).post(`${BASE_URL}/posts`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({});
        });
    });
    describe(`🍉  PUT ${BASE_URL}/posts/:id`, () => {
        beforeEach(async () => {
            blogStubs = generatePostStubs(12, true);
            await seedBlogs(blogStubs);
        });

        it('🌱 updates a blogPost with the given id', async () => {
            const savedBlogPostId = blogStubs[3]._id;
            const { content, title } = blogStubs[4];

            response = await request(createdApp).put(`${BASE_URL}/posts/${savedBlogPostId}`).send({
                content,
                title,
            });

            expect(response.status).toBe(200);
            expect(response.body.content).toBe(content);
            expect(response.body.title).toBe(title);
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
            expect(response.body._id).toBe(savedBlogPostId.toString());

            const savedBlogPost = await BlogPost.findById(savedBlogPostId);
            expect(savedBlogPost.content).toBe(content);
            expect(savedBlogPost.title).toBe(title);
        });

        it('🌱 saves blogPost with empty html content if is content is dirty', async () => {
            const { _id, content, title } = blogStubs[9];
            const dirtyHtml = '<script>alert("Some alert") var dirty = "dirty"; </script>';

            response = await request(createdApp).put(`${BASE_URL}/posts/${_id}`).send({
                content: dirtyHtml,
                title: blogStubs[1],
            });

            expect(response.status).toBe(400);
            const savedBlogPost = await BlogPost.findById(_id);
            expect(savedBlogPost.content).toBe(content);
            expect(savedBlogPost.title).toBe(title);
        });

        it('🌱 fails to save dirty html', async () => {
            const { _id } = blogStubs[0];
            const dirtyHtml = '<script>alert("Some alert") var dirty = "dirty"; </script>';
            const cleanHtml = '<p>this is clean</p>';

            response = await request(createdApp)
                .put(`${BASE_URL}/posts/${_id}`)
                .send({
                    content: `${dirtyHtml} ${cleanHtml} ${dirtyHtml}`,
                    title: blogStubs[3].title,
                });

            expect(response.status).toBe(200);
            expect(response.body.content).toMatch(cleanHtml);
            expect(response.body.title).toBe(blogStubs[3].title);
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
            expect(response.body._id).toBeDefined();

            const savedBlogPost = await BlogPost.findById(_id);
            expect(savedBlogPost.content).not.toMatch(new RegExp(dirtyHtml));
            expect(savedBlogPost.content).toMatch(new RegExp(cleanHtml));
            expect(savedBlogPost.title).toBe(blogStubs[3].title);
        });

        it(`🌱 fails and throws 400 if no body is sended`, async () => {
            const savedBlogPostId = blogStubs[10]._id;
            response = await request(createdApp).put(`${BASE_URL}/posts/${savedBlogPostId}`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({});
        });
    });
});
