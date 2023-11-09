import Design from '../models/designModel.js'; 
import mongoose from 'mongoose';
import path from 'path';


// Get all designs
const getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.find();
    res.status(200).json({
      data: designs,
      message: 'success',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};

// Get a single Design
const getDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
    });
  }




 

  try {
    const design = await Design.findById(id).populate('companyId').populate('categoryId');

    if (!design) {
      return res.status(404).json({
        data: null,
        message: 'Not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: design,
      message: 'success',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};

// Create a new Design
const createDesign = async (req, res) => {
  const { companyId, categoryId } = req.body;


  try {
    const imagesArray = req.files.map(file => path.join('uploads/design', file.filename)); // Store image paths

    const design = await Design.create({ images: imagesArray, companyId, categoryId });

    res.status(201).json({
      data: design,
      message: 'success',
      status: 201,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err.message,
      status: 400,
    });
  }
};


// Update a Design
const updateDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
    });
  }

  try {
    const updatedFields = {}; 

    // Check if new images are provided
    if (req.files && req.files.length > 0) {
      const imagesArray = req.files.map(file => path.join('uploads/design', file.filename));
      updatedFields.images = imagesArray;
    }

    
    if (req.body.companyId) {
      updatedFields.companyId = req.body.companyId;
    }
    if (req.body.categoryId) {
      updatedFields.categoryId = req.body.categoryId;
    }

    const updatedDesign = await Design.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedDesign) {
      return res.status(404).json({
        data: null,
        message: 'Not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: updatedDesign,
      message: 'success',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};



// Delete a Design
const deleteDesign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
    });
  }
  try {
    const design = await Design.findByIdAndDelete(id);

    if (!design) {
      return res.status(404).json({
        data: null,
        message: 'Not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: design,
      message: 'success',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};

// Export functions
export { createDesign, getAllDesigns, getDesign, deleteDesign, updateDesign };
