import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../app';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {

  done();
});

describe('## Image Upload API', () => {
  let image = {
    filename: './test-files/avatar.jpg',
    projectName:"EasyApp",
    scope:"UserProfile",
    container:2,
    baseUrl:'http://localhost:8000/'
  };

  describe('# POST /v1.0/files/upload', () => {
    it('should upload a file', (done) => {
      request(app)
        .post('/v1.0/files/upload')
        .field("projectName", image.projectName)
        .field("scope", image.scope)
        .field("container", image.container)
        .field("baseUrl", image.baseUrl)
        .attach('filename', image.filename)
        .expect(httpStatus.OK)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.success.data[0].imageUrl).to.equal(image.baseUrl+image.projectName+"/"+image.scope+"/"+image.container+"/avatar.jpg");
          image = res.body;
          done();
        })
        .catch(done);
    });
  });

});
