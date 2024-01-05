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
    if (req.file) {
      const category = await Category.create(
        { name, image: req.file.path, CompanyId: CompanyId },
        { include: [{ model: Company, as: "Company" }] }
      );
      res.status(201).json({
        data: category,
        message: "Category created successfully!",
        status: 201,
      });
    } else {
      const category = await Category.create(
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

// Update an existing category
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const existingCat = await Category.findByPk(id);
    if (!existingCat) {
      return res.status(404).json({
        data: null,
        message: `Category with Id: ${id} not found!`,
        status: 404,
      });
    }

    let newImage = existingCat.image;

    // Check if a new image file is uploaded
    if (req.file) {
      newImage = req.file.path;
    }

    const update = await Category.update(
      { name: name, image: newImage },
      {
        where: { id },
      }
    );

    const updatedCat = await Category.findByPk(id);
    if (updatedCat) {
      return res.status(200).json({
        data: update,
        message: `Category with ID: ${id} updated successfully!`,
        status: 200,
      });
    } else {
      return res.status(400).json({
        data: null,
        message: `Failed to update category with ID: ${id}`,
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

export const getCategoriesByCompanyId = async (req, res) => {
  const { id } = req.params;
  try {
    const Categories = await Category.findAll({
      where: { companyId: id },
      include: [{ model: Company, as: 'Company' }],
    });

    if (!Categories || Categories.length === 0) {
      return res.status(404).json({
        message: 'No Category Found!',
        status: 404,
        error: true,
      });
    } else {
      return res.status(200).json({
        data: Categories,
        message: 'success',
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
      error: true,
    });
  }
};
