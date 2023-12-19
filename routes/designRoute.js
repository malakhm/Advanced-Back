import express from 'express';
import { createDesign, getAllDesigns, getDesign, deleteDesign, updateDesign } from '../controllers/designController.js';
import { upload } from '../configuration/cloudinary.js'; 
import Design from '../models/designModel.js'

const router = express.Router();

// Create a new design with image upload
router.post('/', upload.single('image'), createDesign);

// Get all designs
router.get('/', getAllDesigns);

// Get a specific design by ID
router.get('/:id', getDesign);

// Update a specific design by ID
router.patch('/:id', upload.single('image'), updateDesign);

// Delete a specific design by ID
router.delete('/:id', deleteDesign);


// router.get('/company/:companyId', async (req, res) => {
//     try {
//       const companyId = req.params.companyId;
//       const designs = await Design.find({ companyId });
//       res.json(designs);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


  

export default router;
