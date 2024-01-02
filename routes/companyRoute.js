import express from 'express';
import { createCompany,signInCompany, getAllCompanies, getCompany, deleteCompany, updateCompany } from '../controllers/companyController.js';
import { upload } from '../configuration/cloudinary.js'; 
import Verification from '../Middleware/jwt.js';

const router = express.Router();

// Sign In 
router.post('/sign', signInCompany)
// Get all companies
router.get('/', getAllCompanies);

// Get a single company
router.get('/:id', getCompany);

// Add a new company
router.post('/',upload.single('logo'), createCompany); //admin and company have access
router.use(express.urlencoded({ extended: true }));


// Update a company
// router.put('/:id', Verification.verifyCompany,upload.single('logo'), updateCompany);//admin and company have access
router.put('/:id', upload.single('logo'), updateCompany);//admin and company have access



// Delete a company
router.delete('/:id', Verification.verifyAdmin,deleteCompany);//admin only have access

export default router;
