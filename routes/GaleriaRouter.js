import routerx from 'express-promise-router';
import galeriaController from '../controllers/GaleriaController';

const router = routerx();

router.post('/registrar', galeriaController.registrar);
router.get('/mostrar', galeriaController.mostrar);
router.get('/listar', galeriaController.listar);
router.put('/modificar', galeriaController.modificar);
router.delete('/eliminar', galeriaController.eliminar);
router.put('/activar', galeriaController.activar);
router.put('/desactivar', galeriaController.desactivar);

export default router;