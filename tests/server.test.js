const supertest = require('supertest');
// const server = require('./server');
const expect = require('expect');

const { app } = require('../server/server');
const Todo = require('../models/todoModel');

const request = supertest(app);

// seed data
let todos = [{ text: 'First test todo' }, { text: 'Second test todo' }];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
});

/* eslint no-undef:0 */
describe('Server Tests', () => {
  describe('POST /todos', () => {
    it('should create a new todo', done => {
      let text = 'to do from server.test.js';

      request
        .post('/todos')
        .send({ text })
        .expect(201)
        .expect(res => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          /* eslint no-shadow:0 */
          Todo.find({ text })
            .then(todos => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            })
            .catch(e => {
              done(e);
            });
        });
    });

    it('should not create a bad data', done => {
      request
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(2);
              done();
            })
            .catch(e => {
              done(e);
            });
        });
    });
  });

  describe('Get /todos', () => {
    it('should return all todos', done => {
      request
        .get('/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done());
    });
  });
});
