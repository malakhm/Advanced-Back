import express from 'express';
import { createDesign, getAllDesigns, getAllDesignsById,getDesign, deleteDesign, updateDesign } from '../controllers/designController.js';
import { upload } from '../configuration/cloudinary.js'; 
import Design from '../models/designModel.js'
import Verification from '../Middleware/jwt.js';
const router = express.Router();

// Create a new design with image upload
router.post('/', Verification.verifyCompany,upload.array('images', 5), createDesign);// admin and company have access

// Get all designs
router.get('/', getAllDesigns);

// Get a specific design by ID
router.get('/:id', getDesign);
 router.get('/get/:id', getAllDesignsById)
// Update a specific design by ID
router.put('/:id', Verification.verifyCompany,upload.array('images', 5), updateDesign);// admin and company have access

// Delete a specific design by ID
router.delete('/:id', Verification.verifyCompany,deleteDesign);// admin and company have access
                                                                                                                

export default router;
