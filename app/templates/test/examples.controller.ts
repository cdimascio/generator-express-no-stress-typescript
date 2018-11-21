import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import * as HttpStatus from 'http-status-codes';
import { doesNotReject } from 'assert';

let exampleId = null;

describe('Examples', () => {
  it('should add a new example', () =>
    request(Server)
      .post('/api/v1/examples')
      .send({ name: 'test1' })
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .then(r => {
        exampleId = r.body._id;
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .to.equal('test1');
      }));

  it('should add another new example', () =>
    request(Server)
      .post('/api/v1/examples')
      .send({ name: 'test2' })
      .expect(HttpStatus.CREATED)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .to.equal('test2');
      }));

  it('should get all examples', () =>
    request(Server)
      .get('/api/v1/examples')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.lengthOf.greaterThan(1);
      }));

  it('should get an example by id', () =>
    request(Server)
      .get(`/api/v1/examples/${exampleId}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test1');
      }));

  it('should update an example', () =>
    request(Server)
      .patch(`/api/v1/examples/${exampleId}`)
      .send({ name: 'test1-updated' })
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test1-updated');
      }));

  it('should remove an example', () =>
    request(Server)
      .delete(`/api/v1/examples/${exampleId}`)
      .expect(HttpStatus.NO_CONTENT)
      .then(r => {
        expect(r.body).to.be.empty;
      }));
});
