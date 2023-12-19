import Message from "../models/messageModel.js";
import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

// Get all Messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        { model: Company, as: "Company" },
        { model: User, as: "User" },
      ],
    });
    return res.status(200).json({
      data: messages,
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

// Get a single Message
export const getMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const message = await Message.findByPk(id, {
      include: [
        { model: Company, as: "Company" },
        { model: User, as: "User" },
      ],
    });
    if (message) {
      return res.status(200).json({
        data: message,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `Message not found`,
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

// Create a new Message
export const createMessage = async (req, res) => {
  const { content, CompanyId, UserId } = req.body;
  try {
    const message = await Message.create({ content, CompanyId, UserId });

    res.status(201).json({
      data: message,
      message: "Message created successfully!",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create Message",
      status: 500,
      error: true,
    });
  }
};

// Update an existing Message
export const updateMessage = async (req, res) => {
  try {
    const id = req.params.id;

    const existingMessage = await Message.findByPk(id);
    if (!existingMessage) {
      return res.status(404).json({
        data: null,
        message: `Message with Id: ${id} not found!`,
        status: 404,
      });
    }
    await Message.update(
      { ...req.body },
      {
        where: { id },
      }
    );

    const updatedMessage = await Message.findByPk(id);
    if (updatedMessage) {
      return res.status(200).json({
        data: updatedMessage,
        message: `Message with ID: ${id} updated successfully!`,
        status: 200,
      });
    } else {
      return res.status(400).json({
        data: null,
        message: `Failed to update Message with ID: ${id}`,
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

// delete Message
export const deleteMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({
        message: "No Message Found!",
        status: 404,
        error: true,
      });
    }
    const deletedMessage = await Message.destroy({ where: { id } });
    if (deletedMessage) {
      return res.status(200).json({
        message: `Message is deleted!`,
        status: 200,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `Failed to delete message!`,
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
