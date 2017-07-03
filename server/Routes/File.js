import express from 'express';
import util from 'util';
import File from '../Controllers/File';
import Auth from '../Helpers/BasicAuth';


const router = express.Router();

router.post('/upload', Auth.isAuthenticated, File.postImage);

export default router;
