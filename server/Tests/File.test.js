import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import rmdir from 'rmdir';
import app from '../../app';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  let path = './public/uploads';
  rmdir(path + '/test', function (err, dirs, files) {
    console.log(dirs);
    console.log(files);
    console.log('all files are removed');
  });
  done();
});

describe('## Image Upload API', () => {
  let image = {
    filename: './test-files/avatar.jpg',
    projectName:"test",
    scope:"scope",
    container:2,
    baseUrl:'http://localhost:8000/'
  };

  let auth = {
    appId: 'image-api-rest',
    appSecret: 'pDblTMZaFam59d@F9c#V1G9UEL17)Odz'
  };


  describe('# POST /v1.0/files/upload', () => {
    it('should throw unauthorized', (done) => {
      request(app)
      .post('/v1.0/files/upload')
      .expect(401, done);
    });
  });

  describe('# POST /v1.0/files/upload', () => {
    it('should upload a file', (done) => {
      request(app)
        .post('/v1.0/files/upload')
        .auth(auth.appId, auth.appSecret)
        .field("projectName", image.projectName)
        .field("scope", image.scope)
        .field("container", image.container)
        .field("baseUrl", image.baseUrl)
        .attach('filename', image.filename)
        .expect(httpStatus.OK)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.success.data[0].imageUrl).to.equal(image.baseUrl+image.projectName+"/"+image.scope+"/"+image.container+"/avatar.jpg");
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /v1.0/files/upload', () => {
    it('should throw validation error', (done) => {
      request(app)
      .post('/v1.0/files/upload')
      .auth(auth.appId, auth.appSecret)
      .field("container", image.container)
      .field("baseUrl", image.baseUrl)
      .attach('filename', image.filename)
      .expect(httpStatus.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error.code).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

});
