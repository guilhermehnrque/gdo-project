import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../../../application/controllers/AuthController';

const router = Router();

const authController = container.resolve(AuthController);

router.post('/', (req, res) => authController.createUser(req, res));

export default router;
