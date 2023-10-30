import Feedback from '../models/feedbackmodel.js';
import mongoose from 'mongoose';

//get all feedbacks

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      data: feedbacks,
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

// get single feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Invalid',
      status: 404,
    });
  }

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({
        data: null,
        message: 'Feedback not found',
        status: 404,
      });
    }

    res.status(200).json({
      data: feedback,
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

// create a new Feedback 

const createFeedback = async (req, res) => {
  const { content, first_name, last_name } = req.body;

  try {
    const feedback = await Feedback.create({ content, first_name, last_name });
    res.status(201).json({
      data: feedback,
      message: 'success',
      status: 201,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};

// delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Invalid',
      status: 404,
    });
  }

  try {
    const feedback = await Feedback.findOneAndDelete({ _id: id });

    if (!feedback) {
      return res.status(404).json({
        data: null,
        message: 'Not Found',
        status: 404,
      });
    }

    res.status(200).json({
      data: feedback,
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

// update feedback 

const updateFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      data: null,
      message: 'Invalid',
      status: 404,
    });
  }

  try {
    const feedback = await Feedback.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!feedback) {
      return res.status(404).json({
        data: null,
        message: 'Not Found',
        status: 404,
      });
    }

    res.status(200).json({
      data: feedback,
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

export {
  createFeedback,
  getFeedback,
  getFeedbacks,
  deleteFeedback,
  updateFeedback,
};
