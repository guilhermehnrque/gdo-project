import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../../controllers/AuthController';

const router = Router();

const authController = container.resolve(AuthController);

router.post('/', (req, res) => authController.createUser(req, res));
router.post('/login', (req, res) => authController.loginUser(req, res));
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password/:token', (req, res) => authController.performResetPassword(req, res));

export default router;
