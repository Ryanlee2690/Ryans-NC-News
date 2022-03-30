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

describe('GET /api/articles/:article_id', () => {
    test('status:200, responds with a single matching articles', () => {
      const ARTICLE_ID = 2;
      return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 2,
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: '2020-10-16T05:03:00.000Z',
            votes: 0
          });
        })
    });
    test('status 404, put in a number of a article that doesnt exist', () => {
        const ARTICLE_ID = 999999
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(404)
        .then(({ body }) => {
        expect(body.msg).toBe('Invalid ID')
        })
    })
  });

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
    })})

    describe('GET /api/users', () => {
        test('responds with an array of usernames ONLY', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
            const { usernames } = body;
            usernames.forEach((username) => {
                expect(username).toEqual(
                    expect.objectContaining({
                        username: expect.any(String)
                    })
                )
            })
        }) 
    })
    })