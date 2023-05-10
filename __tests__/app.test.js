const request = require("supertest");
const app = require("../db/app");
const connection = require("../db/connection.js");
const endpoints = require('../endpoints.json')

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

})    

describe("/api/articles/:article_id", () => {
  test("GET - status 200 - respond swith a article of the corresponding artivcle id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => { 
          expect(typeof result.body.article.author).toBe("string");
        expect(typeof result.body.article.title).toBe("string");
        expect(typeof result.body.article.article_id).toBe("number");
        expect(typeof result.body.article.body).toBe("string");
        expect(typeof result.body.article.topic).toBe("string");
        expect(typeof result.body.article.created_at).toBe("string");
        expect(typeof result.body.article.votes).toBe("number");
          expect(typeof result.body.article.article_img_url).toBe("string");
        });
  });
});
describe('/api/articles/nonsense', () => {
  test('GET - status 400 - responds with error message "Bad request!"', () => {
    return request(app)
      .get('/api/articles/nonsense')
      .expect(400)
      .then(result => {
      expect(result.body.msg).toBe('Bad request!')
    })
    })
})

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

 


