import express from 'express';
import { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany } from '../controllers/companieController.js';

const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get a single company
router.get('/:id', getCompany);

// Add a new company
router.post('/', createCompany);

// Update a company
router.patch('/:id', updateCompany);


// Delete a company
router.delete('/:id', deleteCompany);

export default router;
