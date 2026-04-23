import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

router.use(verifyToken);
router.use(authorizeRoles(['admin']));

router.get('/index', userController.index );
router.get('/indexAll', userController.index);
router.post('/create', userController.create);
router.delete('/delete/:id', userController.delete);
router.get('/find/:id', userController.show);
router.put('/update/:id', userController.update);

export default router;