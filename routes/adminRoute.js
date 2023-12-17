import express from 'express';
import { createAdmin, getAdmins, getAdmin, deleteAdmin, updateAdmin } from '../controllers/admincontroller.js';

const router = express.Router();
router.get("/", getAdmins);
router.get("/:id", getAdmin);
router.post("/", createAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateAdmin);

export default router;
