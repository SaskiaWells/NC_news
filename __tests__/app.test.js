const request = require("supertest");
const app = require("../db/app");
const connection = require("../db/connection.js");

const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

afterAll(() => {
  connection.end();
});
beforeEach(() => {
  return seed({ topicData, userData, articleData, commentData });
});  


describe("/api/topics", () => {
    test("GET - status 200 - responds witan array of topics", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((result) => {
                expect(result.body.topic.length).toBe(3);
                result.body.topic.forEach((topic) => {
                    expect(typeof topic.description).toBe("string");
                    expect(typeof topic.slug).toBe("string");

                });
            });
    });
})

describe('/api/nonsense', () => {
    test('GET - status 500 - responds with an error msg "Invalid path!"', () => {
        return request(app)
            .get('/api/nonsense')
            .expect(500)
            .then(( result ) => {
            expect(result.body.msg).toBe('Invalid Path!')
        })
    })
})

