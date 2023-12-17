import Admin from "../models/adminModel.js";

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    return res.status(200).json({
      data: admins,
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

// Get a single admin
export const getAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      return res.status(200).json({
        data: admin,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `Admin not found`,
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

// Create a new Admin
export const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingEmail = await Admin.findOne({ where: { email } });
    if (existingEmail) {
      return res.json({
        message: "Email already exists!",
        status: 400,
        error: true,
      });
    }
    const existingUsername = await Admin.findOne({ where: { username } });
    if (existingUsername) {
      return res.json({
        message: "Username already exists!",
        status: 400,
        error: true,
      });
    }
    // console.log("Username:", username);
    // console.log("Password:", password);
    // console.log("Email:", email);
    const admin = await Admin.create({ username, password, email });
    // console.log("New Admin", admin);
    res.status(201).json({
      data: admin,
      message: "Admin created successfully!",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create admin",
      status: 500,
      error: true,
    });
  }
};

// Update an existing Admin
export const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const existingAdmin = await Admin.findByPk(id);
    if (!existingAdmin) {
      return res.status(404).json({
        data: null,
        message: `Admin with Id: ${id} not found!`,
        status: 404,
      });
    }
    await Admin.update(
      { ...req.body },
      {
        where: { id },
      }
    );
 
    const updatedAdmin = await Admin.findByPk(id);
    if (updatedAdmin) {
      return res.status(200).json({
        data: updatedAdmin,
        message: `Admin with ID: ${id} updated successfully!`,
        status: 200,
      });
    } 
    else {
      return res.status(400).json({
        data: null,
        message: `Failed to update admin with ID: ${id}`,
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
 
// delete Admin
export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        message: "No Admin Found!",
        status: 404,
        error: true,
      });
    }
    const deletedAdmin = await Admin.destroy({ where: { id } });
    if (deletedAdmin) {
      return res.status(200).json({
        message: `Admin ${admin.username} is deleted`,
        status: 200,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `Failed to delete admin`,
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