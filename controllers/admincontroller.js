import Admin from '../models/adminModel.js';
import mongoose from 'mongoose';

// Get all admins
const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      data: admin,
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

// Get a single Admin
const getAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'not found',
      status: 404,
    });
  }
  const admin = await Admin.findById(id);

  if (!admin) {
    return res.status(404).json({
      data: null,
      message: 'not found',
      status: 404,
    });
  }

  res.status(200).json({
    data: admin,
    message: 'success',
    status: 200,
  });
}

// Create a new Admin
const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const admin = await Admin.create({ username, password, email });

    res.status(200).json({
      data: admin,
      message: 'success',
      status: 200,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err.message,
      status: 400,
    });
  }
};

// Update an Admin 
const updateAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'not found',
      status: 404,
    });
  }

  try {
    const admin = await Admin.findByIdAndUpdate(id, { ...req.body }, { new: true });

    if (!admin) {
      return res.status(404).json({
        data: null,
        message: 'not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: admin,
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

// Delete an Admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'not found',
      status: 404,
    });
  }
  const admin = await Admin.findByIdAndDelete(id);

  if (!admin) {
    return res.status(404).json({
      data: null,
      message: 'not found',
      status: 404,
    });
  }

  res.status(200).json({
    data: admin,
    message: 'success',
    status: 200,
  });
};

// Export functions
export { createAdmin, getAllAdmin, getAdmin, deleteAdmin, updateAdmin };

