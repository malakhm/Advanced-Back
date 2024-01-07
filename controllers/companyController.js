import Company from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Category from "../models/categoryModel.js";
import Design from "../models/designModel.js";
import Message from "../models/messageModel.js";
// sign in
const signInCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required fields!",
    });
  }

  try {
    const findEmail = await Company.findOne({ where: { email: email } });

    if (!findEmail) {
      // Email not found
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, findEmail.password);

    if (match) {
      // Authentication successful
      const token = jwt.sign(
        {
          id: findEmail.id,
          isCompany: true,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).send({
        id: findEmail.id,
        name: findEmail.name,
        email: findEmail.email,
        phone: findEmail.phone,
        location: findEmail.location,
        website_link: findEmail.website_link,
        logo: findEmail.logo,
        accessToken: token,
      });
    } else {
      // Incorrect password
      return res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Error in signInCompany:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json({
      data: companies,
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

// Get a single Company
const getCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({
        data: null,
        message: "Company not found",
        status: 404,
      });
    }

    res.status(200).json({
      data: company,
      message: "success",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

// Create a new Company
const createCompany = async (req, res) => {
  const { name, phone, location, website_link, email, password } = req.body;

  const oldUserEmail = await Company.findOne({ where: { email: email } });
  const oldUserName = await Company.findOne({ where: { name: name } });

  if (oldUserEmail) {
    return res.status(409).json({ status: 409, field: "email" });
  }

  if (oldUserName) {
    return res.status(409).json({ status: 409, field: "name" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await Company.create({
      name,
      location,
      website_link,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      data: company,
      message: "Company created successfully",
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

const updateCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, telephone, email, location } = req.body;

    if (req.file) {
      const logo = req.file.path;
      const updateCompanyLogo = await Company.update(
        {
          logo: logo,
        },
        {
          where: { id },
        }
      );
    }

    const updatedCompany = await Company.update(
      {
        name,
        telephone,
        email,
        location,
      },
      {
        where: { id },
      }
    );

    const updatedCompanie = await Company.findByPk(id);
    if (updatedCompanie) {
      return res.status(200).json({
        data: updatedCompanie,
        message: `User with ID: ${id} updated successfully!`,
        status: 200,
      });
    } else {
      return res.status(400).json({
        data: null,
        message: `Failed to update user with ID: ${id}`,
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

// Delete a Company
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const delete_message = await Message.destroy({ where: { CompanyId: id } });
    const delete_category = await Category.destroy({
      where: { CompanyId: id },
    });
    const delete_design = await Design.destroy({ where: { CompanyId: id } });
    const company = await Company.destroy({ where: { id } });
    if (!company) {
      return res.status(404).json({
        data: null,
        message: "Company not found",
        status: 404,
      });
    }
    res.status(200).json({
      data: company,
      message: "Company deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

export {
  createCompany,
  getAllCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
  signInCompany,
};
