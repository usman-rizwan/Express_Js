import express from 'express';
import user from '../controller/user.js';
import products from './products.js'
import upload from './upload.js'
const router = express.Router();

router.use('/users', user);
router.use('/upload', upload);
router.use('/products', products);


export default router;