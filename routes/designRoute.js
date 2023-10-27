import express from 'express';
import { createDesign, getAllDesigns, getDesign, deleteDesign, updateDesign} from '../controllers/designController.js';
import { upload } from '../configuration/multer.js'; // Import Multer configuration

const router = express.Router();

//create a new design with image upload
router.post('/', upload.array('images', 5), createDesign);

// get all designs
router.get('/', getAllDesigns);

//  get a specific design by ID
router.get('/:id', getDesign);

//update a specific design by ID
router.patch('/:id', upload.array('images', 5), updateDesign);

//delete  a specific design by ID
router.delete('/:id', deleteDesign);

export default router;
