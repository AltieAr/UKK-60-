import express from "express";

const router = express.Router();

import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

router.use(verifyToken);
router.use(authorizeRoles(['admin']));

router.get("/index", );
router.post("/create", );
router.get("/find/:id", );
router.put("/update/:id", );
router.delete("/delete/:id", );

export default router;
