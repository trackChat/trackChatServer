
require('dotenv').config();


const { app } = require('../src/server/server');

const supergoose = require('@code-fellows/supergoose');
const { isElementOfType } = require('react-dom/test-utils');

const mockRequest = supergoose(app);

let users = {
  admin: { username: 'admin', password: 'password', email: 'admin@admin.com', color: '#1C1D21', phoneNumber: 5675675678 },
  editor: { username: 'editor', password: 'password', email: 'editor@admin.com', color: '#1C1D21', phoneNumber: 1231231234 },
  user: { username: 'user', password: 'password', color: '#1C1D21', phoneNumber: 3783783786, email: 'user@user.com' },
};

describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const results = await mockRequest.post('/signup').send(users[userType]);
        expect(results.text).toBe('success');

      });

      it('can signin with basic', async () => {

        const { username } = users[userType];
        const { password } = users[userType];

        const results = await mockRequest
          .post('/signin').auth(username, password);

        expect(results.status).toBe(200);
        expect(results.body.user.color).toBe('#1C1D21');

      });

    });
  });
  it('will not let a user sign up with the same email', async () => {
    let badUser = { username: 'john', phoneNumber: 7897897896, password: 'password', color: '#1C1D21', email: 'user@user.com' };
    const results = await mockRequest.post('/signup').send(badUser);
    expect(results.text).toBe('used email');


  });

  it('will not let a user sign up with the same phone', async () => {

    let badUser = { username: 'joe', phoneNumber: 3783783786, password: 'password', color: '#1C1D21', email: 'joe@user.com' };

    const results = await mockRequest.post('/signup').send(badUser);
    expect(results.text).toBe('used phone number');

  });

  it('will not let a user sign up with the same phone', async () => {

    let badUser = { username: 'user', phoneNumber: 1001001009, password: 'password', color: '#1C1D21', email: 'jolly@user.com' };

    const results = await mockRequest.post('/signup').send(badUser);
    expect(results.text).toBe('used name');

  });


});