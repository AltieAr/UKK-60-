import express from 'express';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import logController from '../controllers/logController.js';
const router = express.Router();


router.use(verifyToken);
router.use(authorizeRoles(['owner']));

router.get('/index', logController.index);

export default router;