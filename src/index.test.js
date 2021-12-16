const App = require('.');
const request = require('supertest');
const { expect } = require('chai');

describe('action.js', () => {
  it('test get message', () => {
    request(App)
      .get('/product')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
