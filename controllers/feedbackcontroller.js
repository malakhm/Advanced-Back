import Feedback from '../models/feedbackmodel.js';


//get all feedbacks

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
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
  try {
    const feedback = await Feedback.findByPk(id);
    if (feedback) {
      res.status(200).json(article);
    }
    else {
      res.status(404).json({error: "feedback not found"});
    }
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}

// create a new Feedback 

const createFeedback = async (req, res) => {
  const { content, first_name, last_name } = req.body;
  try {
    const feedback = await Feedback.create({content, first_name, last_name});
    res.status(201).json({
      data: feedback,
      message: "feedback created!",
      status: 201,
    });
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}

// delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.destroy({where:{id}});
    if (!feedback) {
      return res.status(404).json({
        data: null,
        message: 'feedback not found',
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
    });
  }
}

// update feedback 

const updateFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = { content, first_name, last_name } = req.body;
    if(feedback) {
      const newFeedback = await Feedback.update(
        { content, first_name, last_name }, {where: { id }}
      );
      if (!newFeedback) {
        return res.status(404).json({
          data: null,
          message: 'feedback not found',
          status: 404,
        });
      }
    }

  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
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
