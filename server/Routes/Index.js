import express from 'express';
import fileRoutes from './File';
import ResponseObject from '../Helpers/ResponseObject';

const router = express.Router();


router.get('/unauthorized', (req, res) =>
  res.status(401).json(new ResponseObject(200, { message: 'Invalid Request' }))
);

// mount routes at /files
router.use('/files', fileRoutes);


export default router;
