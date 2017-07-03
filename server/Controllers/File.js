import multiparty from 'multiparty';
import fs from 'fs';
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
  });

  // HANDLE FORM ERROR
  form.on('error', (error) => {
    debug(error);
    next(error);
  });

  // PARSE REQUEST
  form.parse(req, function(err, fields, files) {
    debug(files);

    if(err) {
      return res.status(400).json(new ResponseObject(400, err));
    }


    let validationErrors = [];
    if(!fields.projectName) {
      validationErrors.push("Project name required!");
    }
    if(!fields.scope) {
      validationErrors.push("Scope required!");
    }
    if(!fields.container) {
      validationErrors.push("Container required!");
    }

    if(validationErrors.length > 0) {
      fs.unlink(files.filename[0].path);
      return res.status(400).json(new ResponseObject(400, validationErrors));
    }


    let dir = './public/uploads/' + fields.projectName;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    dir += "/"+fields.scope;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    dir += "/"+fields.container;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    fs.rename(files.filename[0].path, dir + "/" +files.filename[0].originalFilename, function (error) {
      if (error) {
        debug(error);
        fs.unlink(dir + files.filename[0].originalFilename);
        fs.rename(files.filename[0].path, dir + "/" + files.filename[0].originalFilename, function (error) {
          debug(error);
        });
      }

      fs.unlink(files.filename[0].path, function (error) {
        debug(error);
      });
    });

    let resData = {
      imageUrl: fields.baseUrl+fields.projectName+"/"+fields.scope+"/"+fields.container+"/"+files.filename[0].originalFilename,
      file: files.filename[0]
    };

    res.status(200).json(new ResponseObject(200, resData));

  });
}

export default { postImage };
