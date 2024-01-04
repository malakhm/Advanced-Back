import express from "express";
import { upload } from '../configuration/cloudinary.js'; 
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";
import Verification from "../Middleware/jwt.js";

const router = express.Router();
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", Verification.verifyCompany,upload.single('image'),createCategory);// company and admin has access
router.delete("/:id", Verification.verifyCompany, deleteCategory);
router.put("/:id", Verification.verifyCompany,updateCategory);

export default router;
