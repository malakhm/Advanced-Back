import Company from '../models/companieModel.js';
import mongoose from 'mongoose';

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Get a single Company
const getCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Company not found' });
  }
  const company = await Company.findById(id);

  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }

  res.status(200).json(company);
};

// Create a new Company
const createCompany = async (req, res) => {
  const { name, telephone, logo, location, website_link, email } = req.body;
  try {
    const company = await Company.create({ name, telephone, logo, location, website_link, email });

    res.json({ mssg: 'Added a new company' });
  } catch (err) {
    res.status(400).json({ mssg: `${err.message}` });
  }
};

// Update a Company 
const updateCompany = async(req, res) => { 
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Company not found' });
  }
  const company = await Company.findByIdAndUpdate({_id:id},{...req.body});

  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }

  res.status(200).json(company);
};





// Delete a Company
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Company not found' });
  }
  const company = await Company.findByIdAndDelete(id);

  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }

  res.status(200).json({ mssg: 'Company deleted' });
};


// Export functions
export { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany };
