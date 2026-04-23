import express from 'express';

import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/dashboard', verifyToken, authorizeRoles('admin'),);

export default router;