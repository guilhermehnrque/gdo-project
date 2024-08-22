import { Router } from 'express';
import AuthController from '../../../application/controllers/AuthController';

const router = Router();

const authController = new AuthController();

router.get('/desgraca', (req, res) => authController.createUser(req, res));

export default router;
