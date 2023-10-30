import express from 'express';
import { createDesign, getAllDesigns, getDesign, deleteDesign, updateDesign } from '../controllers/designController.js';
import { uploadForDesign } from '../configuration/multer.js'; 

const router = express.Router();

// Create a new design with image upload
router.post('/', uploadForDesign.array('images', 5), createDesign);

// Get all designs
router.get('/', getAllDesigns);

// Get a specific design by ID
router.get('/:id', getDesign);

// Update a specific design by ID
router.patch('/:id', uploadForDesign.array('images', 5), updateDesign);

// Delete a specific design by ID
router.delete('/:id', deleteDesign);

export default router;
