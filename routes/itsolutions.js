import { Router } from 'express';
import { all, itsolution, add, edit, remove } from "../controllers/itsolutions.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/:id', itsolution);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;