import express from 'express';
const router = express.Router();

const home = require('./modules/home');

router.use('/', home);

export default router;