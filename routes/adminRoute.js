import express from 'express';
import { createAdmin, getAllAdmin, getAdmin, deleteAdmin, updateAdmin } from '../controllers/admincontroller.js';

const router = express.Router();

// Get all companies
router.get('/', getAllAdmin);

// Get a single company
router.get('/:id', getAdmin);

// Add a new company
router.post('/', createAdmin);

// Update a company
router.patch('/:id', updateAdmin);


// Delete a company
router.delete('/:id', deleteAdmin);

export default router;