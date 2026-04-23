import express from 'express';

import reportController from '../controllers/reportController.js';
const router = express.Router();

import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

router.use(verifyToken);
router.use(authorizeRoles(['owner']));

router.get('/dashboard', reportController.getDashboard)

export default router;