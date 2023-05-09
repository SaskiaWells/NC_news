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
});

describe("/api/nonsense", () => {
  test('GET - status 500 - responds with an error msg "Invalid path!"', () => {
    return request(app)
      .get("/api/nonsense")
      .expect(500)
      .then((result) => {
        expect(result.body.msg).toBe("Invalid Path!");
      });
  });
});

describe("/api", () => {
    test("GET - status 200 - resonds with JSon object of all availiable endpoints", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((result) => {
                expect(Object.keys(result.body.endpoints).length).toBe(3);
            });
    });
    test("json object should have a description key for each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((result) => {
                console.log(result.body)
                expect(result.body.endpoints["GET /api"].description).toBe(
                    "serves up a json representation of all the available endpoints of the api"
                );
                expect(result.body.endpoints["GET /api/topics"].description).toBe(
                    "serves an array of all topics"
                );
                expect(result.body.endpoints["GET /api/articles"].description).toBe(
                    "serves an array of all topics"
                );
            });
    });
    test("json object details the queries on each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((result) => {
                expect(result.body.endpoints["GET /api/topics"].queries).toEqual([]);
                expect(result.body.endpoints["GET /api/articles"].queries).toEqual([
                    "author",
                    "topic",
                    "sort_by",
                    "order",
                ]);
            });
    });
    test('json object should have an example response property for each endpoint', () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((result) => {
                expect(result.body.endpoints["GET /api/topics"].exampleResponse).toEqual({
                    "topics": [{ "slug": "football", "description": "Footie!" }]
                });
                expect(result.body.endpoints["GET /api/articles"].exampleResponse).toEqual({
                    "articles": [
                        {
                            "title": "Seafood substitutions are increasing",
                            "topic": "cooking",
                            "author": "weegembump",
                            "body": "Text from the article..",
                            "created_at": "2018-05-30T15:59:13.341Z",
                            "votes": 0,
                            "comment_count": 6
                        }
                    ]
                });
            })
    });
})    
