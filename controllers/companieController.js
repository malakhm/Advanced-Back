import Company from '../models/companieModel.js';
import mongoose from 'mongoose';

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(
      { data: companies,
        message:'success',
        status : 200
      }
    );



  } catch (error) {
    res.status(400).json( 
      {
       data: null,
       message:error.message,
       status : 400
      }
    );
  }
};

// Get a single Company
const getCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( 
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }
  const company = await Company.findById(id);

  if (!company) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(
    { data: company,
      message:'succes',
      status : 200
    }
  );
}

// Create a new Company
const createCompany = async (req, res) => {
  const { name, telephone, logo, location, website_link, email } = req.body;
  try {
    const company = await Company.create({ name, telephone, logo, location, website_link, email });

    res.json(
      { data: company,
        message:'succes',
        status : 200
      }
    );
  } catch (err) {
    res.status(400).json(
      { data: null,
        message:err.message,
        status : 400
      }
    );
  }
};

// Update a Company 
const updateCompany = async(req, res) => { 
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
    });
  }
  const company = await Company.findByIdAndUpdate({_id:id},{...req.body});

  if (!company) {
    return res.status(404).json(

     {  data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(
      { data: company,
        message:'succes',
        status : 200
      }

  );
};





// Delete a Company
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }
  const company = await Company.findByIdAndDelete(id);

  if (!company) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(

    { data: company,
      message:'success',
      status : 200
    }

  );
};


// Export functions
export { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany };
