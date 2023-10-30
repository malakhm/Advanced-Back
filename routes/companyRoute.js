import express from 'express';
import { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany } from '../controllers/companyController.js';
import { uploadForCompany } from '../configuration/multer.js'; 


const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get a single company
router.get('/:id', getCompany);

// Add a new company
router.post('/', uploadForCompany.single('logo'), createCompany);
router.use(express.urlencoded({ extended: true }));


// Update a company
router.patch('/:id',uploadForCompany.single('logo'), updateCompany);


// Delete a company
router.delete('/:id', deleteCompany);

export default router;
