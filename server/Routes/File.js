import express from 'express';
var util = require('util');

import File from '../Controllers/File';


const router = express.Router();

router.post('/upload', File.postImage);

export default router;
