import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
// import auth from '../middlewares/auth';

const router = routerx();

router.post('/registrar', usuarioController.registrar);
router.get('/mostrar', usuarioController.mostrar);
router.get('/listar', usuarioController.listar);
router.put('/modificar', usuarioController.modificar);
router.delete('/eliminar', usuarioController.eliminar);
router.put('/activar', usuarioController.activar);
router.put('/desactivar', usuarioController.desactivar);

export default router;