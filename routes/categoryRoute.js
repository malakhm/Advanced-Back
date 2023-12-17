import express from "express";


import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;
