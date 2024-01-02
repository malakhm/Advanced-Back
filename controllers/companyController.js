import Company from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Category from "../models/categoryModel.js";
import Design from '../models/designModel.js'
import Message from '../models/messageModel.js'
// sign in
const signInCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json(
      //400 means bad request
      {
        message: "email and password are required fields! ",
      }
    )
  try {
    const findEmail = await Company.findOne({ where: { email: email } });

    if (!findEmail) {
      res.status(404).json({ message: 'not found' });
    } else {
      // console.log(findEmail.password)
      const match = await bcrypt.compare(password, findEmail.password);
      if (match) {
        // Authenticate user with jwt
        // console.log(match)
        const token = jwt.sign(
          {
            id: findEmail.id,
            isCompany:true,
         
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).send({
          id: findEmail.id,
          name: findEmail.name,
          email: findEmail.email,
          phone: findEmail.phone,
          location: findEmail.location,
          website_link: findEmail.website_link,
          logo: findEmail.logo,
          accessToken: token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const { name, phone, location, website_link, email, categories, password } =
    req.body;

  const oldUser = await Company.findOne({ where: { email: email } });
  if (oldUser) return res.status(409).json("user already exists!!");

  try {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
        password
      )
    ) {
      res.status(422).json({ message: "Invalid password" });
      return;
    } else {
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // const logo = req.file.path;

    const company = await Company.create({
      name,
      // logo,
      location,
      website_link,
      email,
      phone,
      password: hashedPassword,
      // categories,
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
    const { name, telephone, email, location, categories } = req.body;

    if (req.file) {
      const image = req.file.path;
      updateFields.logo = image;
    }

    const updatedCompany = await Company.update(
      {
        name,
        telephone,
        email,
        location,
        categories,
      },
      {
        where: { id },
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        data: null,
        message: "Company not found",
        status: 404,
      });
    }

    res.status(200).json({
      data: updatedCompany,
      message: "Company updated successfully",
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

// Delete a Company
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const delete_message = await Message.destroy({where:{CompanyId:id}})
    const delete_category = await Category.destroy({where: {CompanyId: id}})
    const delete_design = await Design.destroy({where: {CompanyId: id}})
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
