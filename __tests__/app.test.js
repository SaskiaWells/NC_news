const request = require("supertest");
const app = require("../db/app/app");
const connection = require("../db/connection.js");
const endpoints = require("../endpoints.json");
require("jest-sorted");

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
  test('GET - status 404 - responds with an error msg "Invalid path!"', () => {
    return request(app)
      .get("/api/nonsense")
      .expect(404)
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
        expect(result.body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET - status 200 - respond swith a article of the corresponding artivcle id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        expect(typeof result.body.article.author).toBe("string");
        expect(typeof result.body.article.title).toBe("string");
        expect(result.body.article.article_id).toBe(1);
        expect(typeof result.body.article.body).toBe("string");
        expect(typeof result.body.article.topic).toBe("string");
        expect(typeof result.body.article.created_at).toBe("string");
        expect(typeof result.body.article.votes).toBe("number");
        expect(typeof result.body.article.article_img_url).toBe("string");
      });
  });
});
describe("/api/articles/nonsense", () => {
  test('GET - status 400 - responds with error message "Bad request!"', () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("Bad request!");
      });
  });
});

describe("/api/articles/10000000000", () => {
  test('GET - status 404 - responds with error message "Not found!"', () => {
    return request(app)
      .get("/api/articles/1000000000")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Not found!");
      });
  });
});

describe("/api/articles", () => {
  test("GET - status 200 - responds with an array of arcticle objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body.articles.length).toBe(12);
        expect(result.body.articles[0].comment_count).toBe(2);
        expect(result.body.articles).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
        result.body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.comment_count).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET - status 200 - responds with the comments for a given artilce ID", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments.length).toBe(11);
        expect(result.body.comments).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
        result.body.comments.forEach((comment) => {
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });

  test("POST - status 201 - post a comment to article if article exists, responds with the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .expect(201)
      .send({
        body: "I am adding a comment",
        author: "icellusedkars",
      })
      .then((result) => {
           const { comment } = result.body; 
           expect(comment.comment_id).toBe(19);
           expect(comment.body).toBe("I am adding a comment");
           expect(comment.article_id).toBe(1);
        expect(comment.author).toBe("icellusedkars");
        expect(comment.votes).toBe(0)
        // expect(comment.created_at).toBe(new Date().toISOString());
      });
  });
});

describe("/api/articles/10000000000/comments", () => {
  test('GET - status 404 - responds with error message "Article not found!"', () => {
    return request(app)
      .get("/api/articles/1000000000/comments")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Article not found!");
      });
  });

  test('POST - status 404 - responds with error message "Article not found!"', () => {
    return request(app)
      .post("/api/articles/1000000000/comments")
      .send({
        body: "I am adding a comment",
        author: "icellusedkars",
      })
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("Article not found!");
      });
  });
});

describe("/api/articles/nonsense/comments", () => {
  test('GET - status 400 - responds with error message "Bad request!"', () => {
    return request(app)
      .get("/api/articles/nonsense/comments")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("Bad request!");
      });
  });
    test('POST - status 400 - responds with error message "Bad request!"', () => {
      return request(app)
        .post("/api/articles/nonsense/comments")
        .send({
          body: "I am adding a comment",
          author: "icellusedkars",
        })
        .expect(400)
        .then((result) => {
          expect(result.body.msg).toBe("Bad request!");
        });
    });
});
