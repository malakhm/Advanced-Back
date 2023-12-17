import express from 'express';
import { createCategorie, getAllCategories, getCategorie, deleteCategorie, updateCategorie } from '../controllers/categorieController .js';

const router = express.Router();

// Get all categorie 
router.get('/', getAllCategories);

// Get a single category
router.get('/:id', getCategorie);

// Add a new category 
router.post('/', createCategorie);

// Update a category
router.patch('/:id', updateCategorie);

// Delete a category
router.delete('/:id', deleteCategorie);

export default router;
