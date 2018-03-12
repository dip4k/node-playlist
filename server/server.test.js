const request = require("supertest");

const server = require("./server");

it("should send hello world response", done => {
  request(server.app)
    .get("/")
    .expect(200)
    .expect("hello world")
    .end(done);
});
