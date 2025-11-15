import { Router } from 'express';
import { getAllPlayers } from '../controllers/playerController';

const router = Router();

router.get('/get', getAllPlayers);

export default router;
