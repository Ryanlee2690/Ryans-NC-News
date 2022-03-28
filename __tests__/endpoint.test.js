
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')


afterAll(() => {
    if (db.end) db.end();
});

beforeEach(() => {
return seed(testData)
})

describe('GET /api/topics', () => {
    test('status:200', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    test('responds with an array of topics with slug and description', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            const { topics } = body;
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                )
            })
        }

    )})
    test('gets a 404 when a wrong input is requested', () => {
        return request(app)
        .get('/ajenfoiejgfa')
        .expect(404)
    })
})