import routerx from 'express-promise-router';
import slideController from '../controllers/SlideController';

const router = routerx();

router.post('/registrar', slideController.registrar);
router.get('/mostrar', slideController.mostrar);
router.get('/listar', slideController.listar);
router.put('/modificar', slideController.modificar);
router.delete('/eliminar', slideController.eliminar);
router.put('/activar', slideController.activar);
router.put('/desactivar', slideController.desactivar);

export default router;