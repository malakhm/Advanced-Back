import Design from "../models/designModel.js";
import cloudinary from "cloudinary";
import { promisify } from "util";
import multer from "multer";
import Company from "../models/companyModel.js";
import Category from "../models/categoryModel.js";
// // Get all designs
const getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.findAll( {include: [Company, Category]});
    res.status(200).json({
      data: designs,
      message: "success",
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
  try {
    const design = await Design.findByPk(id,  {include: [Company, Category]});

    if (!design) {
      return res.status(404).json({
        data: null,
        message: "Not found",
        status: 404,
      });
    }

    res.status(200).json({
      data: design,
      message: "success",
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
  const { CompanyId, CategoryId } = req.body;


  const data = await Design.findAll( {include: [Company, Category]})
  //store images on cloudinary server
  const uploadToCloudinary = promisify(cloudinary.v2.uploader.upload);
  const cloudinaryUrls = await Promise.all(

    req.files.map(async (file) => {
      try {
        const result = await uploadToCloudinary(file.path, {
          folder: "designs",
        });
        return result.secure_url; // Use secure_url for HTTPS URL
      } catch (error) {
        console.error(`Error uploading image to Cloudinary: ${error.message}`);
        return null; // Handle the error gracefully
      }
    })
  );
  try {
    const design = await Design.create({
      images: cloudinaryUrls,
      CategoryId,
      CompanyId
    });

    res.status(201).json({
      data: data,
      message: "success",
      status: 201,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: err.message,
      status: 500,
    });
  }
};

// Update a Design
const updateDesign = async (req, res) => {
  const { id } = req.params;
  const {CategoryId} = req.body

    //store images on cloudinary server
  const uploadToCloudinary = promisify(cloudinary.v2.uploader.upload);

  const cloudinaryUrls = await Promise.all(
    req.files.map(async (file) => {
      try {
        const result = await uploadToCloudinary(file.path, {
          folder: "designs",
        });
        return result.secure_url; // Use secure_url for HTTPS URL
      } catch (error) {
        console.error(`Error uploading image to Cloudinary: ${error.message}`);
        return null; // Handle the error gracefully
      }
    })
  );

  try {
    const data = await Design.findByPk( id,{include: [Company, Category]})


    const updatedDesign = await Design.update( {images:cloudinaryUrls, CategoryId:CategoryId},
       {where:{id}});

    if (!updatedDesign) {
      return res.status(404).json({
        data: null,
        message: "Not found",
        status: 404,
      });
    }

    res.status(200).json({
      data: data,
      message: "success",
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

  try {
    const design = await Design.destroy({where:{id}});

    if (!design) {
      return res.status(404).json({
        data: null,
        message: "Not found",
        status: 404,
      });
    }

    res.status(200).json({
      data: design,
      message: "success",
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


// // Get all designs by company id
const getAllDesignsById = async (req, res) => {
  try {
    const { id } = req.params;
    const designs = await Design.findAll({where:{CompanyId:id} ,include: [Company, Category]});
    res.status(200).json({
      data: designs,
      message: "success",
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

// // Export functions
export { createDesign,getAllDesignsById, getAllDesigns, getDesign, deleteDesign, updateDesign };
