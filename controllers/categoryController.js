import Category from "../models/categoryModel.js";
import Company from "../models/companyModel.js";
import Design from "../models/designModel.js";

// Get all Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Company, as: "Company" }],
    });
    return res.status(200).json({
      data: categories,
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

// Get a single Category
export const getCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id, {
      include: [{ model: Company, as: "Company" }],
    });
    if (category) {
      return res.status(200).json({
        data: category,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `Category not found`,
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
};

// Create a new Category
export const createCategory = async (req, res) => {
  const { name, CompanyId } = req.body;
  try {
    const existingName = await Category.findOne({ where: { name } });
    if (existingName) {
      return res.json({
        message: "Category's name already exists!",
        status: 400,
        error: true,
      });
    }
    if(req.file){
      const category = await Category.create(
        { name, image:req.file.path,CompanyId: CompanyId },
        { include: [{ model: Company, as: "Company" }] }
        
      );
      res.status(201).json({
        data: category,
        message: "Category created successfully!",
        status: 201,
      });

    }
    else{const category = await Category.create(
      { name, CompanyId: CompanyId },
      { include: [{ model: Company, as: "Company" }] }
    );
    res.status(201).json({
      data: category,
      message: "Category created successfully!",
      status: 201,
    });
    }
    
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create Category",
      status: 500,
      error: true,
    });
  }
};

// Update an existing Category
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
      return res.status(404).json({
        data: null,
        message: `Category with Id: ${id} not found!`,
        status: 404,
      });
    }
    await Category.update(
      { ...req.body },
      {
        where: { id },
      }
    );

    const updatedCategory = await Category.findByPk(id);
    if (updatedCategory) {
      return res.status(200).json({
        data: updatedCategory,
        message: `Category with ID: ${id} updated successfully!`,
        status: 200,
      });
    } else {
      return res.status(400).json({
        data: null,
        message: `Failed to update Category with ID: ${id}`,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

// delete Category
export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        message: "No Category Found!",
        status: 404,
        error: true,
      });
    }
    const deletedDesigns = await Design.destroy({ where: { CategoryId: id } });
    const deletedCategory = await Category.destroy({ where: { id } });
    if (deletedCategory) {
      return res.status(200).json({
        message: `Category and associated designs are deleted!`,
        status: 200,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `Failed to delete Category`,
        status: 400,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
      error: true,
    });
  }
};
