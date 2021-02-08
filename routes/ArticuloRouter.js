import routerx from 'express-promise-router';
import articuloController from '../controllers/ArticuloController';

const router = routerx();

router.post('/registrar', articuloController.registrar);
router.get('/mostrar', articuloController.mostrar);
router.get('/listar', articuloController.listar);
router.put('/modificar', articuloController.modificar);
router.delete('/eliminar', articuloController.eliminar);
router.put('/activar', articuloController.activar);
router.put('/desactivar', articuloController.desactivar);

export default router;