import express from 'express';
import { getVesselsController } from '../controllers/vessel-controller';

const router = express.Router();

router.get('/', getVesselsController);

export default router;
