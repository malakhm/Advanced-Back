import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Feedback from "../models/feedbackmodel.js";
import Message from "../models/messageModel.js";
import Favorite from "../models/favoriteModel.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      data: users,
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

// Get a single user
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json({
        data: user,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `User not found`,
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

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists!",
        error: true,
      });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists!",
        error: true,
      });
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password)) {
      return res.status(422).json({
        message: "Invalid password",
        error: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      data: user,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      data: null,
      message: "Failed to create user!",
      error: true,
    });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res.status(404).json({
        data: null,
        message: `User with Id: ${id} not found!`,
        status: 404,
      });
    }
    const newImage = req.file ? req.file.path : existingUser.image;

    await User.update(
      { ...req.body, image: newImage },
      {
        where: { id },
      }
    );

    const updatedUser = await User.findByPk(id);
    if (updatedUser) {
      return res.status(200).json({
        data: updatedUser,
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

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "No User Found!",
        status: 404,
        error: true,
      });
    }

    const deletedFavorites = await Favorite.destroy({ where: { UserId: id } });
    const deletedMessages = await Message.destroy({ where: { UserId: id } });
    const deletedFeedbacks = await Feedback.destroy({ where: { UserId: id } });
    const deletedUser = await User.destroy({ where: { id } });
    if (deletedUser) {
      return res.status(200).json({
        message: `User ${user.username} and associated records are deleted`,
        status: 200,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: `Failed to delete user`,
        status: 400,
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: 500,
      error: true,
    });
  }
};

//Sign in User
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required fields!",
    });
  }

  try {
    const findEmail = await User.findOne({ where: { email: email } });

    if (!findEmail) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const match = await bcrypt.compare(password, findEmail.password);
    if (match) {
      const token = jwt.sign(
        {
          id: findEmail.id,
          role: findEmail.role,
          isCompany: false,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).send({
        id: findEmail.id,
        username: findEmail.username,
        email: findEmail.email,
        role: findEmail.role,
        image: findEmail.image,
        accessToken: token,
      });
    } else {
      return res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
