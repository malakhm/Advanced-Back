import express from 'express';
import { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany } from '../controllers/companyController.js';
import { upload } from '../configuration/cloudinary.js'; 


const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get a single company
router.get('/:id', getCompany);

// Add a new company
router.post('/', upload.single('logo'), createCompany);
router.use(express.urlencoded({ extended: true }));


// Update a company
router.put('/:id',upload.single('logo'), updateCompany);


// Delete a company
router.delete('/:id', deleteCompany);

export default router;
