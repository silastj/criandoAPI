import { Router } from 'express'
import * as ApiController from '../controllers/apiController'

const router = Router();

router.get('ping', ApiController.ping);
router.get('random', ApiController.random);
router.get('nome/:nome', ApiController.nome);
router.post('carros', ApiController.createCars);
router.get('carros', ApiController.listCars);
router.get('carros/aleatoria', ApiController.ramdomCars);
router.get('carros/:id', ApiController.getCars);
router.put('carros/:id', ApiController.updateCars);
router.delete('carros/:id', ApiController.deleteCars);

export default router;