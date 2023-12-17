import Company from '../models/companyModel.js';


// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json({
      data: companies,
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

// Get a single Company
const getCompany = async (req, res) => {
  const { id } = req.params;

 

  try {
    const company = await Company.findByPk(id)
    if (!company) {
      return res.status(404).json({
        data: null,
        message: 'Company not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: company,
      message: 'success',
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
  const { name, telephone, location, website_link, email, categories } = req.body;

  try {
    const logo = req.file.path; 

    const company = await Company.create({
      name,
      telephone,
      logo,
      location,
      website_link,
      email,
      categories,
    });

    res.status(201).json({
      data: company,
      message: 'Company created successfully',
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
    const  {
      name,
      telephone,
      email,
      location,
      categories
    } = req.body

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
        categories
      },
      {
        where: {id}
      }
  
    );

    if (!updatedCompany) {
      return res.status(404).json({
        data: null,
        message: 'Company not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: updatedCompany,
      message: 'Company updated successfully',
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
    const company = await Company.destroy({where:{id}});
    if (!company) {
      return res.status(404).json({
        data: null,
        message: 'Company not found',
        status: 404,
      });
    }
    res.status(200).json({
      data: company,
      message: 'Company deleted successfully',
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

export { createCompany, getAllCompanies, getCompany, deleteCompany, updateCompany };
