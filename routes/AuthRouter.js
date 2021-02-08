import routerx from 'express-promise-router';
import authController from '../controllers/AuthController';

const router = routerx();

router.post('/login', authController.login);

export default router;