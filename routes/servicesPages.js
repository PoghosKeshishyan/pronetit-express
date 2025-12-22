import { Router } from 'express';
import { all, serviceDataById, servicePage, add, edit, remove } from "../controllers/servicesPages.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/services-data/:id', serviceDataById);
router.get('/:id', servicePage);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;