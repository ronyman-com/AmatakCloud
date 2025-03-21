const request = require('supertest');
const app = require('../../src/app');
const { User, Deployment } = require('../../src/database/models');
const { Domain } = require('../../src/database/models');

describe('API Tests', () => {
    let apiKey;

    beforeAll(async () => {
        // Ensure the database is ready
        await User.createTable();
        await Deployment.createTable();

        // Generate an API key for testing
        const res = await request(app)
            .post('/api/generate-key')
            .send({ email: 'test@example.com' });
        apiKey = res.body.apiKey;
    });

    it('should generate an API key', async () => {
        const res = await request(app)
            .post('/api/generate-key')
            .send({ email: 'test2@example.com' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('apiKey');
    });

    it('should create a deployment', async () => {
        const res = await request(app)
            .post('/api/deploy')
            .set('x-api-key', apiKey)
            .send({ repoUrl: 'https://github.com/example/repo' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('deploymentId');
    });

    it('should return 401 if API key is missing', async () => {
        const res = await request(app)
            .post('/api/deploy')
            .send({ repoUrl: 'https://github.com/example/repo' });
        expect(res.statusCode).toEqual(401);
    });

    it('should fetch deployments', async () => {
        const res = await request(app)
            .get('/api/deployments')
            .set('x-api-key', apiKey);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('deployments');
    });
});



describe('Domain Tests', () => {
    let apiKey;

    beforeAll(async () => {
        await Domain.createTable();

        // Generate an API key for testing
        const res = await request(app)
            .post('/api/generate-key')
            .send({ email: 'test@example.com' });
        apiKey = res.body.apiKey;
    });

    it('should create a custom domain', async () => {
        const res = await request(app)
            .post('/api/domains')
            .set('x-api-key', apiKey)
            .send({ domainName: 'example.com' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('domainId');
    });

    it('should return 400 if domain name is missing', async () => {
        const res = await request(app)
            .post('/api/domains')
            .set('x-api-key', apiKey)
            .send({});
        expect(res.statusCode).toEqual(400);
    });
});