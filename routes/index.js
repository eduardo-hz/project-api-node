import routerx from 'express-promise-router';
import usuarioRouter from './UsuarioRouter';
import authRouter from './AuthRouter';
import slideRouter from './SlideRouter';
import articuloRouter from './ArticuloRouter';
import galeriaRouter from './GaleriaRouter';

const router = routerx();
router.use('/usuario', usuarioRouter);
router.use('/auth', authRouter);
router.use('/slide', slideRouter);
router.use('/articulo', articuloRouter);
router.use('/galeria', galeriaRouter);

export default router;