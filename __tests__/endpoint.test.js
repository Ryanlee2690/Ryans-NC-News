const request = require('supertest');
const app = require('../app');
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')


afterAll(() => {
    db.end();
});

beforeEach(() => {
return seed(testData)
})

describe('GET /api/topics', () => {
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
        .then(({body}) => {
            expect(body.msg).toBe('404: Page Not Found.')
        } )
    })
})

describe('PATCH /api/articles/:article_id', () => {
    test('status:200, responds with votes increased by amount added', () => {
        const articleUpdates = {
            inc_votes: 3
        };
        return request(app)
        .patch('/api/articles/1')
        .send(articleUpdates)
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual({ newVotesTotal: 103 })
        })
    })
    test('Works with negative numbers', () => {
        const articleUpdates = {
            inc_votes: -50
        };
        return request(app)
        .patch('/api/articles/1')
        .send(articleUpdates)
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual({ newVotesTotal: 50})
        })
    })
    test('If input is NaN, return a 400 error and a message.', () => {
        const articleUpdates = {
            inc_votes: 'Not a number'
        };
        return request(app)
        .patch('/api/articles/1')
        .send(articleUpdates)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: 'Please use numbers only.'})
        })
    })
})