const supertest = require('supertest');
// const server = require('./server');
const expect = require('expect');
const app = require('./server').app;

const request = supertest(app);

/* eslint no-undef:0 */
describe('Server Tests', () => {
  it('should send hello world response', done => {
    request
      .get('/')
      .expect(200)
      .expect('hello world')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should send error response', done => {
    request
      .get('/error')
      .expect(404)
      .expect({ error: 'page not found' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  // get json data
  describe('GET /user', () => {
    it('user.name should be an case-insensitive match for "dipak"', done => {
      request
        .get('/user')
        .set('Accept', 'application/json')
        .expect(res => {
          res.body.name = res.body.name.toUpperCase();
        })
        .expect(
          201,
          {
            id: 'dip4k',
            name: 'DIPAK'
          },
          done // done can be used here
        );
    });
  });

  // use expect package functions
  describe('Get /user with expect package example', () => {
    it('should return my user object', done => {
      request
        .get('/user')
        .expect(201)
        .expect(res => {
          expect(res.body).toInclude({
            // can also use other expect functions
            name: 'Dipak',
            id: 'dip4k'
          });
        })
        .end(done);
    });
  });
});

// example with promises
// describe('GET /user', () => {
//   it('respond with json', () =>
//     request
//       .get('/user')
//       .set('Accept', 'application/json')
//       .expect(201)
//       .then(response => {
//         assert(response.body.name, 'Dipak');
//         assert(response.body.id, 'dip4k');
//       }));
// });

// Code examples for using supertest with mocha
// describe('GET /users', () => {
//   it('respond with json', done => {
//     request(app)
//       .get('/users')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
// });