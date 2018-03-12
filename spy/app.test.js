const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

/* eslint no-undef:0 */
/* eslint no-underscore-dangle:0 */

describe('App', () => {
  let db = { saveUser: expect.createSpy() }; // create spy

  // replace app.db with test/spy db using rewire
  app.__set__('db', db);

  // check spy works correctlly
  it('should call the spy correctly', () => {
    let spy = expect.createSpy();
    spy('dipak', 'dip4k');
    expect(spy).toHaveBeenCalledWith('dipak', 'dip4k');
  });

  // to test rewire call
  it('should call saveUser with user object', () => {
    let email = 'dip4k@c.com';
    let password = 'abcd';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  });
});
