import multiparty from 'multiparty';
import ResponseObject from '../Helpers/ResponseObject';

/**
 * Upload file
 */

const debug = require('debug')('image-api-server:index');

function postImage(req, res, next) {
  const params = req.body;

  const form = new multiparty.Form({ autoFiles: true, uploadDir: 'public/uploads/' });
  console.log(req);
  form.on('file', (filename, file) => {
    debug(file);

    res.status(200).json(new ResponseObject(200, file));
  });

  // HANDLE FORM ERROR
  form.on('error', (error) => {
    debug(error);
    next(error);
  });

  // PARSE REQUEST
  form.parse(req);
}

export default { postImage };
